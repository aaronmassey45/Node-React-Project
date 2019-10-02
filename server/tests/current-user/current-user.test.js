const request = require('supertest');

const currentUserQuery = require('./current-user.query');
const { setupDatabase, userOne, closeConnection } = require('../db');
const app = require('../../app');

beforeEach(setupDatabase);
afterAll(closeConnection);

test('Should get profile for user', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: currentUserQuery,
    });

  expect(res.body.data.me.username).toBe(userOne.username);
});

test('Should get profile for user with editing data', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: currentUserQuery,
      variables: { withEditingData: true },
    });

  expect(res.body.data.me.username).toBe(userOne.username);
  expect(res.body.data.me.email).toBe(userOne.email);
});

test('Should not get profile of user without sending token', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: currentUserQuery,
    });

  expect(res.body.data.me).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated.');
});

test('Should not get profile of user with invalid token', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', 'asdf7isadh.ihdnfnsausad.214532iosadhds')
    .send({
      query: currentUserQuery,
    });

  expect(res.body.data.me).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated.');
});
