const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  bio: {
    default: 'Chowster n00b',
    maxlength: 240,
    minlength: 1,
    trim: true,
    type: String,
  },
  email: {
    maxlength: 60,
    minlength: 1,
    required: [true, 'Email is required.'],
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
    unique: true,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isAFoodTruck: {
    required: true,
    type: Boolean,
  },
  isEmailVerified: {
    required: true,
    type: Boolean,
    default: false,
  },
  likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  location: {
    default: "Somewhere chowin' down",
    maxlength: 50,
    minlength: 4,
    trim: true,
    type: String,
  },
  password: {
    minlength: [6, 'Your password must be at least 6 characters.'],
    required: [true, 'Password is required.'],
    type: String,
  },
  profileImg: {
    default: function() {
      return `https://api.adorable.io/avatars/200/${this.username}.png`;
    },
    minlength: 1,
    type: String,
  },
  rating: {
    average: {
      default: 0,
      type: Number,
    },
    numberOfRatings: {
      default: 0,
      type: Number,
    },
    totalRating: {
      default: 0,
      type: Number,
    },
  },
  tokens: [
    {
      access: {
        required: true,
        type: String,
      },
      token: {
        required: true,
        type: String,
      },
    },
  ],
  username: {
    maxlength: 20,
    minlength: 3,
    required: [true, 'Username is required.'],
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isAlphanumeric,
      message: '{VALUE} is not alphanumeric',
    },
    unique: true,
  },
  username_lowercase: {
    default: function() {
      return this.username.toLowerCase();
    },
    type: String,
    unique: true,
  },
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access,
      },
      process.env.JWT_SECRET
    )
    .toString();

  user.tokens = [...user.tokens, { access, token }];
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;
  delete userObj.username_lowercase;

  return userObj;
};

UserSchema.methods.removeToken = function(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token },
    },
  });
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject(new Error('Token does not exist'));
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access,
  });
};

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({
    username_lowercase: username.toLowerCase(),
  });
  if (!user) throw new Error('Invalid Credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid Credentials');

  return user;
};

UserSchema.pre('save', function(next) {
  const user = this;

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

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} is already taken!',
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
