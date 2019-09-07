const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'bobsburgersfoodtruck',
  email: 'bob@burgers.com',
  isAFoodTruck: true,
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign(
        { _id: userOneId, access: 'auth' },
        process.env.JWT_SECRET
      ),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
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
  _id: new mongoose.Types.ObjectId(),
  text: 'We will be back in 5 minutes, have to drop a potato in the crock pot',
  _creator: userOneId,
};

const postTwo = {
  _id: new mongoose.Types.ObjectId(),
  text: 'I will be Hokage!',
  _creator: userTwoId,
};

const randomId = () => new mongoose.Types.ObjectId();

const setupDatabase = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Post(postOne).save();
  await new Post(postTwo).save();
};

module.exports = {
  postOne,
  postTwo,
  randomId,
  setupDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
};
