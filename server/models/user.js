const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    required: true,
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
    unique: true,
  },
  isAFoodTruck: {
    required: true,
    type: Boolean,
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
    minlength: 6,
    required: true,
    type: String,
  },
  profileImg: {
    default: 'https://dummyimage.com/600x400/000/fff&text=Dummy+Img',
    minlength: 1,
    type: String,
  },
  rating: {
    average: {
      default: 0,
      type: String,
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
    required: true,
    trim: true,
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isAlphanumeric,
      message: '{VALUE} is not alphanumeric',
    },
    unique: true,
  },
});

UserSchema.methods.generateAuthToken = function() {
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

  user.tokens.push({ access, token });
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  const {
    _id,
    username,
    bio,
    location,
    isAFoodTruck,
    profileImg,
    email,
    rating,
  } = userObj;

  return {
    _id,
    username,
    bio,
    location,
    isAFoodTruck,
    profileImg,
    email,
    rating,
  };
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
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findByCredentials = async function(username, password) {
  const User = this;

  return User.findOne({ username }).then(user => {
    if (!user) return Promise.resolve('No user found');

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        res ? resolve(user) : resolve('Incorrect password');
      });
    });
  });
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

mongoose.model('user', UserSchema);
