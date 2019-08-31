const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `App is listening on port ${PORT}. Mode: ${process.env.NODE_ENV}`
  );
});
