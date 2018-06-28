const mongoose = require('mongoose');
const User = mongoose.model('user');

const login = async ({ password, username }) => {
  return new Promise((resolve, reject) => {
    return User.findByCredentials(username, password).then(user => {
      if (!user || user === 'Invalid Credentials')
        return reject(new Error('Invalid Credentials'));
      const token = user.generateAuthToken().then(token => resolve(token));
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

    const token = await user.generateAuthToken();
    return token;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

module.exports = { login, logout, signup };
