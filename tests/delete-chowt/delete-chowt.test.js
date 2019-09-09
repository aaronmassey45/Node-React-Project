const request = require('supertest');

const deleteChowtMutation = require('./delete-chowt.mutation');
const { setupDatabase, userOne, postOne, randomId } = require('../db');
const app = require('../../app');
const Post = require('../../models/post');
const User = require('../../models/user');

beforeEach(setupDatabase);

test('Should delete a users chowt', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: deleteChowtMutation, variables: { id: postOne._id } });

  const post = await Post.findById(postOne._id);
  const user = await User.findById(userOne._id);

  expect(post).toBeNull();
  expect(user.likedPosts).toHaveLength(1);
  expect(user.likedPosts).not.toContainEqual(postOne._id);
  expect(res.body.data.deleteChowt.id).toBe(postOne._id.toString());
});

test('Should not delete a chowt if user is not authenticated', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: deleteChowtMutation, variables: { id: postOne._id } });

  const post = await Post.findById(postOne._id);

  expect(post).toMatchObject(postOne);
  expect(res.body.data.deleteChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated.');
});

test('Should not delete a chowt with id that does not exist it database', async () => {
  const id = randomId();
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: deleteChowtMutation, variables: { id } });

  const post = await Post.findById(id);

  expect(post).toBeNull();
  expect(res.body.data.deleteChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('No post found.');
});

test('Should not delete a chowt with invalid id', async () => {
  const id = 'SaintsFootballIsGreat';
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: deleteChowtMutation, variables: { id } });

  const post = await Post.find({ id });

  expect(post).toHaveLength(0);
  expect(res.body.data.deleteChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Invalid post id.');
});
