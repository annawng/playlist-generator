require('dotenv').config();

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const CLIENT_URI = process.env.CLIENT_URI;
const SERVER_URI = process.env.SERVER_URI;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = {
  PORT,
  CLIENT_ID,
  SECRET_KEY,
  CLIENT_URI,
  SERVER_URI,
  REDIRECT_URI,
};
