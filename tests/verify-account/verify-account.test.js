const request = require('supertest');

const { closeConnection, setupDatabase, userOne, userTwo } = require('../db');
const app = require('../../app');
const verifyUserAccountQuery = require('./verify-account.query');

beforeEach(setupDatabase);

afterAll(closeConnection);

test('Should verify users account', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: { username: userOne.username, token: userOne.tokens[0].token },
    });

  expect(res.body.data.verifyUserAccount).toEqual('Success');
});

test('Should not verify users account if token does not belong to user', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: { username: userOne.username, token: userTwo.tokens[0].token },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual('Unable to verify account.');
});

test('Should not verify users account if already verified', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: { username: userTwo.username, token: userTwo.tokens[0].token },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual(
    'You have already verified your email!'
  );
});

test('Should not verify users account if provided invalid token', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: {
        username: userTwo.username,
        token: 'asfhdjsasgfv asbcs7w2131',
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual('Token does not exist');
});

test('Should not verify users account if username is falsy', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: {
        username: '',
        token: 'asfhdjsasgfv asbcs7w2131',
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual(
    'Missing verification information.'
  );
});

test('Should not verify users account if token is falsy', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: verifyUserAccountQuery,
      variables: {
        username: userTwo.username,
        token: '',
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual(
    'Missing verification information.'
  );
});
