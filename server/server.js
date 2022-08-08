require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const index = require('./routes/index');

const app = express();

const port = process.env.PORT;
const site = process.env.CLIENT_URI;

app.use(
  cors({
    origin: site,
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use('/', index);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
