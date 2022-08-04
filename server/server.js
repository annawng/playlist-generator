require('dotenv').config({ path: '../.env' });

const express = require('express');
const index = require('./routes/index');

const app = express();

const port = process.env.PORT;

app.use('/', index);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
