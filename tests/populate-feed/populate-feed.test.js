const request = require('supertest');

const populateFeedQuery = require('./populate-feed.query');
const {
  closeConnection,
  postOne,
  setupDatabase,
  userOne,
  userTwo,
} = require('../db');
const app = require('../../app');
const Post = require('../../models/post');
const User = require('../../models/user');
const { followUser } = require('../../services/user');

beforeEach(setupDatabase);
afterAll(closeConnection);

test('Should populate feed of current user', async () => {
  const user = await User.findById(userOne._id);
  await followUser(userTwo._id, user);
  const userWithFollowing = await User.findById(userOne._id);

  const res = await request(app)
    .post('/api')
    .set('x-auth', userWithFollowing.tokens[0].token)
    .send({ query: populateFeedQuery });

  expect(res.body.data.populateFeed).toHaveLength(2);
});

test('Should initially populate feed with no more than 25 posts', async () => {
  const posts = [];
  for (let i = 0; i < 26; i++) {
    posts.push({ text: `post ${i}`, _creator: userTwo._id });
  }

  await Post.insertMany(posts);
  const user = await User.findById(userOne._id);
  await followUser(userTwo._id, user);
  const userWithFollowing = await User.findById(userOne._id);

  const res = await request(app)
    .post('/api')
    .set('x-auth', userWithFollowing.tokens[0].token)
    .send({ query: populateFeedQuery });

  expect(posts).toHaveLength(26);
  expect(res.body.data.populateFeed).toHaveLength(25);
});

test('Should only return the users posts if user is not following anyone', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({ query: populateFeedQuery });

  expect(res.body.data.populateFeed).toHaveLength(1);
  expect(res.body.data.populateFeed[0].text).toBe(postOne.text);
});

test('Should not populate feed without a current user', async () => {
  const res = await request(app)
    .post('/api')
    .send({ query: populateFeedQuery });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated.');
});
