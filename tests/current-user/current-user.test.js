const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const currentUserQuery = require('./current-user.query');
const User = require('../../models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'bobsburgersfoodtruck',
  email: 'bob@burgers.com',
  isAFoodTruck: true,
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign(
        { _id: userOneId, access: 'auth' },
        process.env.JWT_SECRET
      ),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

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
