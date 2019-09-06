const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOneToken = jwt.sign(
  { _id: userOneId, access: 'auth' },
  process.env.JWT_SECRET
);

const userOne = {
  _id: userOneId,
  username: 'teamosupremeo',
  email: 'team@supreme.com',
  isAFoodTruck: false,
  password: 'mchammeRtIMe?!99',
  tokens: [
    {
      access: 'auth',
      token: userOneToken,
    },
    {
      access: 'test',
      token: jwt.sign(
        { _id: userOneId, access: 'test' },
        process.env.JWT_SECRET
      ),
    },
  ],
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.disconnect();
});

beforeEach(async () => {
  await User.deleteMany();
});

test('Should successfully create a new user matching user model', async () => {
  await new User({
    email: userOne.email,
    isAFoodTruck: userOne.isAFoodTruck,
    password: userOne.password,
    username: userOne.username,
  }).save();

  const user = await User.findOne({ username: userOne.username });

  expect(user.bio).toBe('Chowster n00b');
  expect(user.location).toContain("Somewhere chowin' down");
  expect(user.followers).toHaveLength(0);
  expect(user.following).toHaveLength(0);
  expect(user.likedPosts).toHaveLength(0);
  expect(user.tokens).toHaveLength(0);
  expect(user.isEmailVerified).toBe(false);
  expect(user._id).toBeDefined();
  expect(user.password).not.toBe(userOne.password);
  expect(user.profileImg).toContain(userOne.username);
  expect(user.username).toBe(userOne.username);
  expect(user.username_lowercase).toBe(userOne.username.toLowerCase());
  expect(user.email).toBe(userOne.email);
  expect(user.isAFoodTruck).toBe(userOne.isAFoodTruck);
  expect(user.rating).toMatchObject({
    average: 0,
    numberOfRatings: 0,
    totalRating: 0,
  });
});

test('Should not create user without username', () => {
  expect(() => {
    new User({
      email: userOne.email,
      isAFoodTruck: userOne.isAFoodTruck,
      password: userOne.password,
    });
  }).toThrow();
});

test('Should not create user without password', () => {
  const user = new User({
    email: userOne.email,
    isAFoodTruck: userOne.isAFoodTruck,
    username: userOne.username,
  });

  user.validate(err => {
    expect(err.errors.password).toBeTruthy();
  });
});

test('Should not create user without email', () => {
  const user = new User({
    isAFoodTruck: userOne.isAFoodTruck,
    password: userOne.password,
    username: userOne.username,
  });

  user.validate(err => {
    expect(err.errors.email).toBeTruthy();
  });
});

test('Should not create user without isAFoodTruck variable', () => {
  const user = new User({
    email: userOne.email,
    password: userOne.password,
    username: userOne.username,
  });

  user.validate(err => {
    expect(err.errors.isAFoodTruck).toBeTruthy();
  });
});

test('Should generate an auth token', async () => {
  const user = await new User({
    email: userOne.email,
    isAFoodTruck: userOne.isAFoodTruck,
    password: userOne.password,
    username: userOne.username,
  }).save();

  const token = await user.generateAuthToken();

  const userWithToken = await User.findOne({ username: userOne.username });

  expect(userWithToken.tokens).toHaveLength(1);
  expect(userWithToken.tokens[0].token).toBe(token);
});

test('Should return user without private variables', () => {
  const user = JSON.stringify(
    new User({
      email: userOne.email,
      isAFoodTruck: userOne.isAFoodTruck,
      password: userOne.password,
      username: userOne.username,
    })
  );

  expect(user.tokens).toBe(undefined);
  expect(user.password).toBe(undefined);
  expect(user.username_lowercase).toBe(undefined);
});

test('Should remove user token', async () => {
  const userWithTokens = await new User(userOne).save();
  await userWithTokens.removeToken(userOneToken);

  const user = await User.findById(userOneId);

  expect(user.tokens).toHaveLength(1);
  expect(user.tokens).not.toContain(userOneToken);
});

test('Should find user by token', async () => {
  await new User(userOne).save();

  const user = await User.findByToken(userOneToken);

  expect(user.id).toBe(userOneId.toString());
});

test('Should find user by username and password', async () => {
  await new User(userOne).save();

  const user = await User.findByCredentials(userOne.username, userOne.password);

  expect(user.id).toBe(userOneId.toString());
});
