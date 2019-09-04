const mongoose = require('mongoose');
const Post = mongoose.model('post');

const ObjectId = mongoose.Types.ObjectId;

const chowt = async (text, location, user) => {
  try {
    if (!user) throw new Error('You are not authenticated.');

    const post = new Post({
      location,
      text,
      timeCreated: new Date().getTime(),
      _creator: user._id,
    });
    return await post.save();
  } catch (err) {
    return err;
  }
};

const likeChowt = async (id, currentUser) => {
  try {
    if (!ObjectId.isValid(id)) throw new Error('Invalid chowt id.');

    const post = await Post.findById(id);
    if (!post) throw new Error('No post found');

    const haveLiked = post.likedBy.some(user => user.equals(currentUser._id));

    if (haveLiked) {
      post.likedBy = post.likedBy.filter(user =>
        user.equals(currentUser._id) ? false : true
      );
      currentUser.likedPosts = currentUser.likedPosts.filter(post =>
        post.equals(id) ? false : true
      );
    } else {
      post.likedBy.push(currentUser._id);
      currentUser.likedPosts.push(id);
    }

    await post.save();
    await currentUser.save();

    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteChowt = async (id, currentUser) => {
  try {
    if (!ObjectId.isValid(id)) throw new Error('Invalid post id.');

    const post = await Post.findOneAndRemove({
      _id: id,
      _creator: currentUser._id,
    });

    if (!post) throw new Error('No post found');

    currentUser.likedPosts = currentUser.likedPosts.filter(post =>
      post.equals(id) ? false : true
    );
    await currentUser.save();

    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { chowt, likeChowt, deleteChowt };
