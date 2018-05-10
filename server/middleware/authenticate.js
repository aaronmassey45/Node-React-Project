const mongoose = require('mongoose');

const User = mongoose.model('user');

const authenticate = async (req, res, next) => {
  let token = req.header('x-auth');

  try {
    const user = await User.findByToken(token);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = authenticate;
