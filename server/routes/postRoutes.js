const mongoose = require('mongoose');
const Post = mongoose.model('post');
const authenticate = require('../middleware/authenticate');

module.exports = app => {
  app.post('/chowt', authenticate, async (req, res) => {
    try {
      const body = _.pick(req.body, ['text', 'location']);
      const post = new Post({
        _creator: req.user._id,
        location: body.location,
        text: body.text,
        timeCreated: new Date().getTime(),
      });
      const doc = await post.save();
      res.send(doc);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/post/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) return res.status(404).send();

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

  app.delete('/post/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) return res.status(404).send();

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
