const request = require('supertest');
const bcrypt = require('bcryptjs');

const updateUserMutation = require('./update-user.mutation');
const { setupDatabase, userTwo } = require('../db');
const app = require('../../app');
const User = require('../../models/user');

beforeEach(setupDatabase);

const updatedUserVariables = {
  bio: 'The savior...',
  email: 'swolekage@konoha.com',
  location: 'The Hidden Leaf Village',
  newPassword: 'th!sK@geisSw0le',
  profileImg: 'http://tinygraphs.com/squares/helloworld',
  username: 'SwoleKage',
};

test('Should update all of a users fields', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: { ...updatedUserVariables, currentPassword: userTwo.password },
    });

  const user = await User.findById(userTwo._id);
  const { newPassword, ...userNoNewPass } = updatedUserVariables;
  const passwordsMatch = await bcrypt.compare(newPassword, user.password);

  expect(user).not.toMatchObject(userTwo);
  expect(user).toMatchObject(userNoNewPass);
  expect(res.body.data.updateUser).toBeTruthy();
  expect(passwordsMatch).toBe(true);
});

test('Should update user without newPassword', async () => {
  const { newPassword, ...userNoNewPass } = updatedUserVariables;
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: { ...userNoNewPass, currentPassword: userTwo.password },
    });

  const user = await User.findById(userTwo._id);
  const passwordsMatch = await bcrypt.compare(newPassword, user.password);

  expect(user).not.toMatchObject(userTwo);
  expect(user).toMatchObject(userNoNewPass);
  expect(res.body.data.updateUser).toBeTruthy();
  expect(passwordsMatch).toBe(false);
});

test('Should not update user without submitting fields', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
    });

  expect(res.body.errors).toHaveLength(6);
  res.body.errors.forEach(error =>
    expect(error.message).toMatch(
      /(bio|email|location|profileImg|username|currentPassword)/
    )
  );
  expect(res.body.data).toBe(undefined);
});

test('Should not update user when submitting invalid bio', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        bio: '',
        currentPassword: userTwo.password,
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Missing information');
  expect(res.body.data.updateUser).toBeNull();
});

test('Should not update user when submitting invalid email', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        email: '',
        currentPassword: userTwo.password,
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Missing information');
  expect(res.body.data.updateUser).toBeNull();
});

test('Should not update user when submitting invalid profileImg', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        profileImg: '',
        currentPassword: userTwo.password,
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Missing information');
  expect(res.body.data.updateUser).toBeNull();
});

test('Should not update user when submitting invalid username', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        username: '',
        currentPassword: userTwo.password,
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Missing information');
  expect(res.body.data.updateUser).toBeNull();
});

test('Should not update user when submitting invalid location', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        location: '',
        currentPassword: userTwo.password,
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('Missing information');
  expect(res.body.data.updateUser).toBeNull();
});

test('Should not update user without submitting currentPassword', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: updateUserMutation,
      variables: {
        ...updatedUserVariables,
        currentPassword: '',
      },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe(
    'You must enter your password to update your account.'
  );
  expect(res.body.data.updateUser).toBeNull();
});
