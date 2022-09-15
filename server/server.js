const express = require('express');
const app = express();
const cors = require('cors');
const index = require('./routes/index');
const { PORT, CLIENT_URI } = require('./utils/config');

app.use(
  cors({
    origin: CLIENT_URI,
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use('/', index);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
