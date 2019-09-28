const request = require('supertest');

const { closeConnection, setupDatabase, userOne } = require('../db');
const app = require('../../app');
const getRandomUsersQuery = require('./random-users.query');
const User = require('../../models/user');

beforeEach(setupDatabase);

afterAll(closeConnection);

const userThree = {
  username: 'userThree',
  email: 'three@users.com',
  isAFoodTruck: true,
  password: '123456',
};

const userFour = {
  username: 'userFour',
  email: 'four@users.com',
  isAFoodTruck: true,
  password: '123456',
};

test('Should get default (3) random users that does not include the authenticated user', async () => {
  await new User(userThree).save();
  await new User(userFour).save();
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: getRandomUsersQuery });

  expect(res.body.data.randomUsers).toHaveLength(3);
  expect(res.body.data.randomUsers).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ username: userOne.username }),
    ])
  );
});

test('Should get default (3) random users if no authenticated user', async () => {
  await new User(userThree).save();
  const res = await request(app)
    .post('/api')
    .send({ query: getRandomUsersQuery });

  expect(res.body.data.randomUsers).toHaveLength(3);
});

test('Should get sampleSize amount of users', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: getRandomUsersQuery, variables: { sampleSize: 2 } });

  expect(res.body.data.randomUsers).toHaveLength(2);
});
