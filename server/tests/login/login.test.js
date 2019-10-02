const request = require('supertest');

const app = require('../../app');
const login = require('./login.mutation');
const User = require('../../models/user');

const userOne = {
  username: 'squeezycream',
  email: 'squeezy@cream.com',
  isAFoodTruck: true,
  password: '123456',
};

beforeEach(async () => {
  await new User(userOne).save();
});

afterEach(async () => {
  await User.deleteMany();
});

test('Should login existing user', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: login,
      variables: {
        username: userOne.username,
        password: userOne.password,
      },
    });

  const user = await User.findOne({ username: userOne.username });

  expect(res.body.data.login).toBe(user.tokens[0].token);
});

test('Should not login existing user', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: login,
      variables: {
        username: userOne.username,
        password: 'thisisnotmypassword',
      },
    });

  expect(res.body.data.login).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors[0].message).toBe('Invalid Credentials');
});

test('Should not login nonexistent user', async () => {
  const res = await request(app)
    .post('/api')
    .send({
      query: login,
      variables: {
        username: 'doesnotexist',
        password: 'thisisnotmypassword',
      },
    });

  expect(res.body.data.login).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors[0].message).toBe('Invalid Credentials');
});
