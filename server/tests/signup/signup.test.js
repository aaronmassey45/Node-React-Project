const request = require('supertest');

const app = require('../../app');
const signup = require('./signup.mutation');
const User = require('../../models/user');

const userOne = {
  username: 'aaronmassey',
  email: 'aaron@massey.com',
  isAFoodTruck: true,
  password: '123456',
};

beforeEach(async () => {
  await User.deleteMany();
});

test('Should successfully sign up a new user', async done => {
  const res = await request(app)
    .post('/api')
    .send({
      query: signup,
      variables: userOne,
    });

  const user = await User.findOne({ username: userOne.username });

  expect(res.body.data.signup).toBe(user.tokens[0].token);
  done();
});

test('Should fail to sign up a new user with missing username variable', async done => {
  const testUser = { ...userOne };
  delete testUser.username;

  const res = await request(app)
    .post('/api')
    .send({
      query: signup,
      variables: testUser,
    });

  expect(res.body.data).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toMatch(/username/);

  done();
});

test('Should fail to sign up a new user with missing email variable', async done => {
  const testUser = { ...userOne };
  delete testUser.email;

  const res = await request(app)
    .post('/api')
    .send({
      query: signup,
      variables: testUser,
    });

  expect(res.body.data).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toMatch(/email/);

  done();
});

test('Should fail to sign up a new user with missing password variable', async done => {
  const testUser = { ...userOne };
  delete testUser.password;

  const res = await request(app)
    .post('/api')
    .send({
      query: signup,
      variables: testUser,
    });

  expect(res.body.data).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toMatch(/password/);

  done();
});

test('Should fail to sign up a new user with missing isAFoodTruck variable', async done => {
  const testUser = { ...userOne };
  delete testUser.isAFoodTruck;

  const res = await request(app)
    .post('/api')
    .send({
      query: signup,
      variables: testUser,
    });

  expect(res.body.data).toBeFalsy();
  expect(res.body.errors).toBeDefined();
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toMatch(/isAFoodTruck/);

  done();
});
