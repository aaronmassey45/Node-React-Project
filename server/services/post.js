const mongoose = require('mongoose');
const Post = mongoose.model('post');

const chowt = async (text, location, user) => {
  try {
    const post = new Post({
      location,
      text,
      timeCreated: new Date().getTime(),
      _creator: user._id,
    });
    return await post.save();
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { chowt };
