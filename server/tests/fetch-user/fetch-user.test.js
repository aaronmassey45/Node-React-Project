const request = require('supertest');

const fetchUserQuery = require('./fetch-user.query');
const { userOne, setupDatabase, closeConnection } = require('../db');
const app = require('../../app');

beforeEach(setupDatabase);
afterAll(closeConnection);

test('Should find user when given id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: fetchUserQuery, variables: { id: userOne._id } });

  expect(res.body.data.user.id).toBe(userOne._id.toString());
  expect(res.body.data.user.username).toBe(userOne.username);
});

test('Should find user when given username', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: fetchUserQuery, variables: { username: userOne.username } });

  expect(res.body.data.user.id).toBe(userOne._id.toString());
  expect(res.body.data.user.username).toBe(userOne.username);
});

test('Should find user when given any case username', async () => {
  const weirdCaseUsername = userOne.username
    .split('')
    .map((char, i) => (i % 2 === 0 ? char : char.toUpperCase()))
    .join('');

  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: fetchUserQuery,
      variables: { username: weirdCaseUsername },
    });

  expect(res.body.data.user.id).toBe(userOne._id.toString());
  expect(res.body.data.user.username).toBe(userOne.username);
});

test('Should not find user that does not exist', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: fetchUserQuery,
      variables: { username: 'billybob' },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('User does not exist.');
});

test('Should not find user when not provided username or id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: fetchUserQuery,
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe(
    'You must provide an username or user id.'
  );
});

test('Should not find user when provided username and id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: fetchUserQuery,
      variables: { id: userOne._id, username: userOne.username },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Only provide one search argument.');
});
