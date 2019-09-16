const request = require('supertest');

const likeChowtMutation = require('./like-chowt.mutation');
const {
  closeConnection,
  postOne,
  randomId,
  setupDatabase,
  userOne,
} = require('../db');
const app = require('../../app');
const Post = require('../../models/post');

beforeEach(setupDatabase);
afterAll(closeConnection);

test("Should successfully like a user's chowt", async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: likeChowtMutation, variables: { id: postOne._id } });

  const post = await Post.findById(postOne._id);

  expect(res.body.data.likeChowt.id).toBe(postOne._id.toString());
  expect(post.likedBy).toContainEqual(userOne._id);
});

test("Should successfully unlike a user's chowt", async () => {
  await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: likeChowtMutation, variables: { id: postOne._id } });

  const postAfterLike = await Post.findById(postOne._id);
  expect(postAfterLike.likedBy).toContainEqual(userOne._id);

  await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: likeChowtMutation, variables: { id: postOne._id } });

  const postAfterUnlike = await Post.findById(postOne._id);
  expect(postAfterUnlike.likedBy).toHaveLength(0);
  expect(postAfterUnlike.likedBy).not.toContainEqual(userOne._id);
});

test('Should not like a chowt if unauthenticated', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: likeChowtMutation, variables: { id: postOne._id } });

  expect(res.body.data.likeChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('You are not authenticated');
});

test('Should not like a chowt with invalid id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: likeChowtMutation, variables: { id: '123gdsfd*&*fdsf' } });

  expect(res.body.data.likeChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('Invalid chowt id.');
});

test('Should not like a chowt that does not exist', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: likeChowtMutation, variables: { id: randomId() } });

  expect(res.body.data.likeChowt).toBeNull();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('No chowt found.');
});
