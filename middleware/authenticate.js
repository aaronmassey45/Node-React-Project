const mongoose = require('mongoose');

const User = mongoose.model('user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers['x-auth'];
    if (!token) throw new Error();

    const user = await User.findByToken(token);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    req.user = null;
    req.token = null;
    next();
  }
};

module.exports = authenticate;
