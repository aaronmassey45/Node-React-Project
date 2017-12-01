const express = require('express');

const app = express();
let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
