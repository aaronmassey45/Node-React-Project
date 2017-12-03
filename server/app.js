require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');

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

app.post('/signup/newuser', async (req,res) => {
  try {
    let body = _.pick(req.body, ['username', 'email', 'password', 'isAFoodTruck']);

    let userInfo = {
      email: body.email,
      isAFoodTruck: body.isAFoodTruck,
      password: body.password,
      username: body.username
    };

    let user = new User(userInfo);
    await user.save();
    res.send(user);
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
