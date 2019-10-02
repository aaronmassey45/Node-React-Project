const request = require('supertest');

const { closeConnection, setupDatabase, userOne, postTwo } = require('../db');
const app = require('../../app');
const searchQuery = require('./search.query');
const User = require('../../models/user');

beforeEach(setupDatabase);

afterAll(closeConnection);

test('Should find user', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery, variables: { searchTerm: 'bob' } });

  expect(res.body.data.search).toHaveLength(1);
  expect(res.body.data.search).toContainObject({ username: userOne.username });
});

test('Should find post', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery, variables: { searchTerm: 'hokage' } });

  expect(res.body.data.search).toHaveLength(1);
  expect(res.body.data.search).toContainObject({ text: postTwo.text });
});

test('Should find both users and posts', async () => {
  const userThree = {
    username: '8thHokage',
    email: 'hokagep@konoha.com',
    isAFoodTruck: false,
    password: '123456',
  };
  await new User(userThree).save();

  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery, variables: { searchTerm: 'hokage' } });

  expect(res.body.data.search).toHaveLength(2);
  expect(res.body.data.search).toContainObject({ text: postTwo.text });
  expect(res.body.data.search).toContainObject({
    username: userThree.username,
  });
});

test('Should find nothing and return empty array', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery, variables: { searchTerm: 'askjfbsda' } });

  expect(res.body.data.search).toHaveLength(0);
  expect(Array.isArray(res.body.data.search)).toBe(true);
});

test('Should throw error if not provided searchTerm variable', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('searchTerm');
});

test('Should throw error if falsy searchTerm variable', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: searchQuery, variables: { searchTerm: '' } });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toEqual('No search term was provided.');
});
