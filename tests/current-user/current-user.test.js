const request = require('supertest');

const currentUserQuery = require('./current-user.query');
const { setupDatabase, userOne } = require('../db');
const app = require('../../app');

beforeEach(setupDatabase);

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

test('Should not get profile for user', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: currentUserQuery,
    });

  expect(res.body.data.me).toBeFalsy();
});
