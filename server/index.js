require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
require('./models/user');
require('./models/post');
const schema = require('./schema/schema');
const authenticate = require('./middleware/authenticate');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(
  '/api',
  express.json(),
  authenticate,
  expressGraphQL(req => ({
    schema,
    context: {
      user: req.user,
      token: req.token,
    },
    graphiql: process.env.NODE_ENV === 'development',
  }))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `App is listening on port ${PORT}. Mode: ${process.env.NODE_ENV}`
  );
});
