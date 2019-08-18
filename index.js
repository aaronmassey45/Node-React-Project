const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'maintenance') {
  const maintenance = require('./middleware/maintenance');
  app.use(maintenance);
} else {
  require('./db/mongoose');
  const expressGraphQL = require('express-graphql');
  const authenticate = require('./middleware/authenticate');
  const schema = require('./schema/schema');

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
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `App is listening on port ${PORT}. Mode: ${process.env.NODE_ENV}`
  );
});
