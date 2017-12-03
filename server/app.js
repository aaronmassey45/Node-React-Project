require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');
const authenticate = require('./middleware/authenticate')

const clientPath = path.join(__dirname, '../client/build');
let app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

//Fake route to test front end connection
app.get('/users', (req, res) => {
  res.send([
    {
      id: 1,
      username: "samsepi0l"
    }, {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

app.get('/users/me', authenticate, async (req,res) => {
  res.send(req.user);
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
    const token = user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/login', (req,res) => {
  let body = _.pick(req.body, ['username', 'password']);
  res.send({
    username: body.username,
    password: body.password
  });
});

module.exports = app;
