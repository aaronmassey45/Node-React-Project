const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const sendChowtMutation = require('./send-chowt.mutation');
const User = require('../../models/user');
const Post = require('../../models/post');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'teamosupremeo',
  email: 'team@supreme.com',
  isAFoodTruck: false,
  password: 'mchammeRtIMe?!99',
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
  await new User(userOne).save();
});

afterEach(async () => {
  await User.deleteMany();
});

test('Should successfully submit post without location', async () => {
  const text = 'Kablam';

  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: sendChowtMutation, variables: { text } });

  const post = await Post.findById(res.body.data.chowt.id);

  expect(post).toBeTruthy();
  expect(res.body.data.chowt.text).toBe(text);
  expect(res.body.data.chowt._creator.id).toBe(userOneId.toHexString());
  expect(res.body.data.chowt.location.lat).toBeNull();
  expect(res.body.data.chowt.location.lng).toBeNull();
});

test('Should successfully submit post with location', async () => {
  const text = 'We are at The Strip!';
  const location = { lat: 36.1699, lng: 115.1398 };

  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: sendChowtMutation, variables: { text, location } });

  const post = await Post.findById(res.body.data.chowt.id);

  expect(post).toBeTruthy();
  expect(res.body.data.chowt.text).toBe(text);
  expect(res.body.data.chowt._creator.id).toBe(userOneId.toHexString());
  expect(res.body.data.chowt.location).toMatchObject(location);
});

test('Should not submit post without any text', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: sendChowtMutation });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('String!');
  expect(res.body.data).toBe(undefined);
});

test('Should not submit post with empty string', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: sendChowtMutation, variables: { text: '' } });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain(
    'You can not submit an empty chowt!'
  );
  expect(res.body.data.chowt).toBeNull();
});
