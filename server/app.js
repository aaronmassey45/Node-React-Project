const express = require('express');
const path = require('path');

const clientPath = path.join(__dirname, '../client/build');
const app = express();

app.use(express.static(clientPath));

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

module.exports = app;
