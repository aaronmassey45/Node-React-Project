const mongoose = require('mongoose');

const { sendVerificationEmail } = require('../emails/account');

const User = mongoose.model('user');

const login = async ({ password, username }) => {
  try {
    const user = await User.findByCredentials(username.trim(), password);
    const token = user.generateAuthToken();
    return token;
  } catch (err) {
    return err;
  }
};

const logout = async (user, token) => {
  try {
    if (!user) throw new Error("You aren't logged in");
    await user.removeToken(token);
    return user;
  } catch (err) {
    return err;
  }
};

const signup = async ({ email, password, username, isAFoodTruck }) => {
  try {
    const user = new User({ username, email, password, isAFoodTruck });
    await user.save();

    const token = await user.generateAuthToken();
    sendVerificationEmail(email, username, token);
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
