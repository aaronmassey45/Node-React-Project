const request = require('supertest');

const logoutMutation = require('./logout.mutation');
const { userOne, userOneId, setupDatabase } = require('../db');
const app = require('../../app');

beforeEach(setupDatabase);

test('Should successfully log out user', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: logoutMutation });

  expect(res.body.data.logout.id).toBe(userOneId.toString());
});

test('Should not log out user without sending a token', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: logoutMutation });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain("You aren't logged in");
  expect(res.body.data.logout).toBeNull();
});

test('Should not log out user with invalid token', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', 'blue42sethut')
    .send({ query: logoutMutation });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain("You aren't logged in");
  expect(res.body.data.logout).toBeNull();
});
