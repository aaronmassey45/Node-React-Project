const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');

const Post = mongoose.model('post');
const ObjectId = mongoose.Types.ObjectId;

module.exports = app => {
  app.post('/api/chowt', authenticate, async (req, res) => {
    const { text, location } = req.body;
    const post = new Post({
      location,
      text,
      timeCreated: new Date().getTime(),
      _creator: req.user._id,
    });

    try {
      const doc = await post.save();
      res.send(doc);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/api/post/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).send();

    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).send('No post found');

      const exists = post.likedBy.some(user => user.equals(req.user._id));
      if (exists) {
        post.likedBy = post.likedBy.filter(
          user => (user.equals(req.user._id) ? false : true)
        );
        req.user.likedPosts = req.user.likedPosts.filter(
          post => (post.equals(id) ? false : true)
        );
      } else {
        post.likedBy.push(req.user._id);
        req.user.likedPosts.push(id);
      }

      post.save();
      await req.user.save();
      res.send({ post, likedPosts: req.user.likedPosts });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/api/post/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).send();

    try {
      const post = await Post.findOneAndRemove({
        _id: id,
        _creator: req.user._id,
      });
      if (!post) return res.status(400).send();
      res.send({ deleted: post });
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
