const request = require('supertest');

const followUserMutation = require('./follow-user.mutation');
const { setupDatabase, userOne, userTwo, closeConnection } = require('../db');
const app = require('../../app');
const User = require('../../models/user');

beforeEach(setupDatabase);
afterAll(closeConnection);

test('Should follow another user', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: followUserMutation,
      variables: { id: userOne._id },
    });

  const [userOneWithFollower, userTwoWithFollowing] = await User.find();

  expect(res.body.data.followUser).toBe(
    `Successfully followed user ${userOne._id}`
  );
  expect(userOneWithFollower.id).toBe(userOne._id.toString());
  expect(userTwoWithFollowing.id).toBe(userTwo._id.toString());
  expect(userOneWithFollower.followers).toContainEqual(userTwo._id);
  expect(userTwoWithFollowing.following).toContainEqual(userOne._id);
});

test('Should not follow user with invalid id', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: followUserMutation,
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
      query: followUserMutation,
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain('ID!');
});

test('Should not follow user if unauthenticated', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: followUserMutation,
      variables: { id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain("You aren't logged in.");
});

test('Should not be able to follow yourself', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: followUserMutation,
      variables: { id: userTwo._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toContain("You can't follow yourself.");
});

test('Should not follow user if you already follow them', async () => {
  await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: followUserMutation,
      variables: { id: userOne._id },
    });

  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: followUserMutation,
      variables: { id: userOne._id },
    });

  expect(res.body.data.followUser).toBe('You already follow this user.');
});
