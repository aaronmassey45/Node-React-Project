require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');
let { Post } = require('./models/post');
const authenticate = require('./middleware/authenticate')

const clientPath = path.join(__dirname, '../client/build');
let app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

//Routes for posts
app.post('/chowt', authenticate, async (req, res) => {
  try {
    const body = _.pick(req.body, ['text']);
    let post = new Post({ text: body.text, _creator: req.user._id, timeCreated: new Date().getTime() });
    let doc = await post.save();
    res.send(doc);
  } catch (err) {
    res.status(400).send();
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

app.get('/posts/user/:id', async (req, res) => {
  try {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) return res.status(404).send();

    let posts = await Post.find({ _creator: id });
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/post/:id', async (req, res) => {
  try {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) return res.status(404).send();

    let post = await Post.findOne({ _id: id });
    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Routes for users
app.get('/users/me', authenticate, async (req,res) => {
  res.send(req.user);
});

app.get('/users/account/:username', async (req,res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) return res.status(400).send(); 
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/signup/newuser', async (req,res) => {
  try {
    let body = _.pick(req.body, ['username', 'email', 'password', 'isAFoodTruck']);

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

app.post('/user/login', async (req,res) => {
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

//404 route
app.get('*', (req,res) => {
  res.sendFile(clientPath);
});

module.exports = app;
