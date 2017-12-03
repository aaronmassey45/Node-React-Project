const mongoose = require('mongoose');
const validator = require('validator');

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

let User = mongoose.model('user', UserSchema);

module.exports = {User};
