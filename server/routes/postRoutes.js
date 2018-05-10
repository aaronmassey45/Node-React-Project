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
      const post = await Post.findOneAndUpdate(
        { _id: id },
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!post) return res.status(404).send();
      res.send({ post });
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
