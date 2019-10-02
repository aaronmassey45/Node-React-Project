const request = require('supertest');

const { setupDatabase, closeConnection, userOne, userTwo } = require('../db');
const app = require('../../app');
const getFollowersQuery = require('./get-followers.query');
const { followUser } = require('../../services/user');
const User = require('../../models/user');

beforeEach(setupDatabase);
afterAll(closeConnection);

test("Should get a user's followers", async () => {
  const dbUserTwo = await User.findById(userTwo._id);
  await followUser(userOne._id, dbUserTwo);
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: getFollowersQuery,
      variables: { username: userOne.username },
    });

  expect(res.body.data.getFollowers).toHaveLength(1);
  expect(res.body.data.getFollowers[0].id).toBe(dbUserTwo.id);
});

test("Should get a user's following", async () => {
  const dbUserOne = await User.findById(userOne._id);
  await followUser(userTwo._id, dbUserOne);
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: getFollowersQuery,
      variables: { username: userOne.username, getUsersFollowing: true },
    });

  expect(res.body.data.getFollowers).toHaveLength(1);
  expect(res.body.data.getFollowers[0].id).toBe(userTwo._id.toString());
});

test('Should not get followers if a username is not passed', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: getFollowersQuery,
      variables: { username: '' },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You must enter a username.');
});
