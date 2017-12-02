const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

const clientPath = path.join(__dirname, '../client/build');
const app = express();

app.use(express.static(clientPath));
app.use(bodyParser.json());

//Fake route to test front end connection
app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    }, {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

app.post('/login', (req,res) => {
  let body = _.pick(req.body, ['username', 'password']);
  res.send({
    username: body.username,
    password: body.password
  })
});

module.exports = app;
