const request = require('supertest');

const app = require('../../app');
const deleteUserMutation = require('./delete-user.mutation');
const User = require('../../models/user');
const Post = require('../../models/post');
const { setupDatabase, userOne } = require('../db');

beforeEach(setupDatabase);

test('Should delete user and their posts', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: deleteUserMutation });

  const user = await User.findById(userOne._id);
  const posts = await Post.find({ _creator: userOne._id });

  expect(user).toBeNull();
  expect(posts).toHaveLength(0);
  expect(res.body.data.deleteUser).toBe(userOne._id.toString());
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
