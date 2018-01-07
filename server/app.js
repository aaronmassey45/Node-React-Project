require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');
let { Post } = require('./models/post');
const authenticate = require('./middleware/authenticate');

const clientPath = path.join(__dirname, '../client/build');
let app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

//Routes for posts
app.post('/chowt', authenticate, async (req, res) => {
  try {
    const body = _.pick(req.body, ['text', 'location']);
    let post = new Post({
      _creator: req.user._id,
      location: body.location,
      text: body.text,
      timeCreated: new Date().getTime()
    });
    let doc = await post.save();
    res.send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/posts', async (req, res) => {
  try {
    let posts = await Post.find({});
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/post/:id', authenticate, async (req, res) => {
  let { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();

  try {
    let post = await Post.findOneAndUpdate(
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
  let { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();

  try {
    const post = await Post.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    if (!post) return res.status(400).send();
    res.send({ deleted: post });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Routes for users
app.get('/userlist', async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users/me', authenticate, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/users/me', authenticate, async (req, res) => {
  try {
    let user = await User.findOneAndRemove({ _id: req.user._id });
    if (!user) return res.status(400).send();
    await Post.remove({ _creator: req.user._id });
    res.send({ removedUser: user });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/users/me', authenticate, async (req, res) => {
  try {
    const body = _.pick(req.body, [
      'username',
      'email',
      'currentPassword',
      'profileImg',
      'newPassword',
      'bio',
      'location'
    ]);

    if (body.newPassword) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.newPassword, salt, (err, hash) => {
          body.newPassword = hash;
        });
      });
    }

    const user = await User.findByCredentials(
      req.user.username,
      body.currentPassword
    );
    const props = await user.getExtraProps();
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          bio: body.bio,
          email: body.email,
          profileImg: body.profileImg,
          location: body.location,
          password: body.newPassword || props.password,
          username: body.username
        }
      },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send();
  }
});

app.get('/users/account/:username', async (req, res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) return res.status(400).send();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/signup/newuser', async (req, res) => {
  try {
    let body = _.pick(req.body, [
      'username',
      'email',
      'password',
      'isAFoodTruck'
    ]);

    let userInfo = {
      email: body.email,
      isAFoodTruck: body.isAFoodTruck,
      password: body.password,
      username: body.username
    };

    const user = new User(userInfo);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = await User.findByCredentials(body.username, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/logout', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.patch('/rate/user/:id', authenticate, async (req, res) => {
  let { id } = req.params;
  const body = _.pick(req.body, ['rating']);
  if (!ObjectID.isValid(id)) return res.status(404).send();
  if (body.rating < 1) return res.status(400).send({ error: 'Rating too low' });

  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).send();
    if (!user.isAFoodTruck)
      return res.status(400).send('Not a food truck account');

    const totalRating = user.rating.totalRating + body.rating;
    const numberOfRatings = user.rating.numberOfRatings + 1;
    const average = (totalRating / numberOfRatings).toFixed(1);

    let updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          rating: {
            average,
            numberOfRatings,
            totalRating
          }
        }
      },
      { new: true }
    );
    res.send({ updatedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

//404 route
app.get('*', (req, res) => {
  res.sendFile(clientPath);
});

module.exports = app;
