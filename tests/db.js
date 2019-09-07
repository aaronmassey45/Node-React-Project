const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');

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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  setupDatabase,
};
