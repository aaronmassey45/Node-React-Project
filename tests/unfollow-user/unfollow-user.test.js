const request = require('supertest');

const unfollowUserMutation = require('./unfollow-user.mutation');
const { setupDatabase, userOne, userTwo } = require('../db');
const app = require('../../app');
const User = require('../../models/user');
const { followUser } = require('../../services/user');

beforeEach(setupDatabase);

test('Should unfollow user', async () => {
  await followUser(userOne._id, userTwo);

  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: unfollowUserMutation,
      variables: { id: userOne._id },
    });

  const [
    userOneWithoutFollower,
    userTwoWithoutFollowing,
  ] = await User.find().lean();

  expect(res.body.data.unfollowUser).toBe(userOne._id.toString());
  expect(userOneWithoutFollower._id.toString()).toBe(userOne._id.toString());
  expect(userTwoWithoutFollowing._id.toString()).toBe(userTwo._id.toString());
  expect(userOneWithoutFollower.followers).toEqual([]);
  expect(userTwoWithoutFollowing.following).toEqual([]);
});

test('Should not unfollow yourself', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: unfollowUserMutation,
      variables: { id: userTwo._id },
    });

  expect(res.body.data.unfollowUser).toBe('You cannot unfollow yourself.');
});

test('Should not follow user with invalid id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: unfollowUserMutation,
      variables: { id: '$%&*^@432j8faos83' },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Invalid id.');
});

test('Should not follow user without sending id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: unfollowUserMutation,
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('ID!');
});

test('Should not follow user if unauthenticated', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: unfollowUserMutation,
      variables: { id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain("You aren't logged in.");
});
