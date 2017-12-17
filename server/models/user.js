const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  bio: {
    default: 'Chowster n00b',
    maxlength: 240,
    minlength: 1,
    trim: true,
    type: String
  },
  email: {
    maxlength: 40,
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
  location: {
    default: 'Somewhere chowin\' down',
    maxlength: 30,
    minlength: 1,
    trim: true,
    type: String
  },
  password: {
    minlength: 6,
    required: true,
    type: String
  },
  profileImg: {
    default: 'https://dummyimage.com/600x400/000/fff&text=Dummy+Img',
    minlength: 1,
    type: String
  },
  rating: {
    average: {
      default: 0,
      type: Number
    },
    numberOfRatings: {
      default: 0,
      type: Number
    },
    totalRating: {
      default: 0,
      type: Number
    }
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
    maxlength: 20,
    minlength: 3,
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

  return _.pick(userObj, ['_id', 'username', 'bio', 'location', 'isAFoodTruck', 'profileImg', 'email']);
};

UserSchema.methods.removeToken = function (token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  })
}

UserSchema.methods.getExtraProps = function () {
  let user = this;
  return { password: user.password, email: user.email }
}

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (username, password) {
  let User = this;
  return User.findOne({ username }).then(user => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        res ? resolve(user) : reject();
      });
    });
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
