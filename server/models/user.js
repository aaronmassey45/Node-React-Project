const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    minlength: 1,
    required: true,
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    },
    unique: true
  },
  isAFoodTruck: {
    required: true,
    type: Boolean
  },
  password: {
    minlength: 6,
    required: true,
    type: String
  },
  tokens: [{
    access: {
      required: true,
      type: String
    },
    token: {
      required: true,
      type: String
    }
  }],
  username: {
    minlength: 1,
    required: true,
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isAlphanumeric,
      message: '{VALUE} is not alphanumeric'
    },
    unique: true
  }
});

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObj = user.toObject();

  return _.pick(userObj, ['_id', 'username']);
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let User = mongoose.model('user', UserSchema);

module.exports = {User};
