const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const deleteUserMutation = require('./delete-user.mutation');
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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: 'teamoaverage0',
  email: 'team@average0.com',
  isAFoodTruck: true,
  password: 'backpackbananas',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign(
        { _id: userTwoId, access: 'auth' },
        process.env.JWT_SECRET
      ),
    },
  ],
};

const postOne = {
  _creator: userOneId,
  text: 'Howdy yall',
};

const postTwo = {
  _creator: userTwoId,
  text: 'Chowster is great, can not believe only one person worked on this!',
};

beforeEach(async done => {
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Post(postOne).save();
  await new Post(postTwo).save();
  done();
});

afterEach(async done => {
  await User.deleteMany();
  await Post.deleteMany();
  done();
});

test('Should delete user and their posts', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: deleteUserMutation });

  const user = await User.findById(userOneId);
  const posts = await Post.find({ _creator: userOneId });

  expect(user).toBeNull();
  expect(posts).toHaveLength(0);
  expect(res.body.data.deleteUser).toBe(userOneId.toString());
});

test('Should not delete unauthenticated user', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: deleteUserMutation });

  const users = await User.find();
  const posts = await Post.find();

  expect(users).toHaveLength(2);
  expect(posts).toHaveLength(2);
  expect(res.body.data.deleteUser).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated');
});
