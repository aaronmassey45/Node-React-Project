const mongoose = require('mongoose');

const { sendVerificationEmail } = require('../emails/account');

const User = mongoose.model('user');

const login = async ({ password, username }) => {
  return new Promise((resolve, reject) => {
    return User.findByCredentials(username, password).then(user => {
      if (!user || user === 'Invalid Credentials') {
        return reject(new Error('Invalid Credentials'));
      }

      user
        .generateAuthToken()
        .then(token => resolve(token))
        .catch(err => new Error(err));
    });
  }).catch(err => {
    console.log('Error', err);
    return err;
  });
};

const logout = async (user, token) => {
  try {
    if (!user) throw new Error("You aren't logged in");
    await user.removeToken(token);
    return user;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const signup = async ({ email, password, username, isAFoodTruck }) => {
  try {
    const user = new User({ username, email, password, isAFoodTruck });
    await user.save();
    sendVerificationEmail(email);

    const token = await user.generateAuthToken();
    return token;
  } catch (err) {
    const errors = [];
    if (err.errors) {
      for (const key in err.errors) {
        if (key !== 'username_lowercase') errors.push(err.errors[key].message);
      }
    } else {
      errors.push(err);
    }
    return Promise.reject(errors);
  }
};

module.exports = {
  login,
  logout,
  signup,
};
