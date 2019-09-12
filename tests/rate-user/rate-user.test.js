const request = require('supertest');

const rateFoodTruckMutation = require('./rate-user.mutation');
const { setupDatabase, userOne, userTwo } = require('../db');
const app = require('../../app');
const User = require('../../models/user');

beforeEach(setupDatabase);

test('Should rate a food truck account', async () => {
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: rateFoodTruckMutation,
      variables: { rating: 5, id: userOne._id },
    });

  const user = await User.findById(userOne._id);

  const { rateAccount } = res.body.data;

  expect(rateAccount.id).toBe(user.id);
  expect(rateAccount.rating.average).toBe(user.rating.average);
});

test('Should not rate account if rating is less than 1', async () => {
  const rating = 0;
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: rateFoodTruckMutation,
      variables: { rating, id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe(
    `Your rating must be between 1 and 5! You entered ${rating}.`
  );
});

test('Should not rate account if rating is greater than 5', async () => {
  const rating = 6;
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: rateFoodTruckMutation,
      variables: { rating, id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe(
    `Your rating must be between 1 and 5! You entered ${rating}.`
  );
});

test('Should not rate account if rating is a float type', async () => {
  const rating = 3.5;
  const res = await request(app)
    .post('/api')
    .set('x-auth', userTwo.tokens[0].token)
    .send({
      query: rateFoodTruckMutation,
      variables: { rating, id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
});

test('Should not rate account if unauthenticated', async () => {
  const rating = 5;
  const res = await request(app)
    .post('/api')
    .set('x-auth', 'bigdogsarecool')
    .send({
      query: rateFoodTruckMutation,
      variables: { rating, id: userOne._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('You are not authenticated.');
});

test('Should not rate account if user is not a food truck', async () => {
  const rating = 5;
  const res = await request(app)
    .post('/api')
    .set('x-auth', userOne.tokens[0].token)
    .send({
      query: rateFoodTruckMutation,
      variables: { rating, id: userTwo._id },
    });

  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].message).toBe('This is not a food truck account');
});
