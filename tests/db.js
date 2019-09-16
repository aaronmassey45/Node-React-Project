const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');

const randomId = () => new mongoose.Types.ObjectId();

const closeConnection = async () => await mongoose.connection.close();

const userOneId = randomId();
const userTwoId = randomId();
const postOneId = randomId();
const postTwoId = randomId();

const userOne = {
  _id: userOneId,
  username: 'bobsburgersfoodtruck',
  email: 'bob@burgers.com',
  isAFoodTruck: true,
  password: '123456',
  likedPosts: [postOneId, postTwoId],
  tokens: [
    {
      access: 'auth',
      token: jwt.sign(
        { _id: userOneId, access: 'auth' },
        process.env.JWT_SECRET
      ),
    },
  ],
  rating: {
    average: 4.5,
    numberOfRatings: 2,
    totalRating: 9,
  },
};

const userTwo = {
  _id: userTwoId,
  username: 'NarutoTheGoat',
  email: 'so6p@naruto.com',
  isAFoodTruck: false,
  password: 'another0n3',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign(
        { _id: userTwoId, access: 'auth' },
        process.env.JWT_SECRET
      ),
    },
  ],
};

const postOne = {
  _id: postOneId,
  text: 'We will be back in 5 minutes, have to drop a potato in the crock pot',
  _creator: userOneId,
};

const postTwo = {
  _id: postTwoId,
  text: 'I will be Hokage!',
  _creator: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Post(postOne).save();
  await new Post(postTwo).save();
};

module.exports = {
  closeConnection,
  postOne,
  postTwo,
  randomId,
  setupDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
};
