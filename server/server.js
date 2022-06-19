require('dotenv').config({ path: '../.env' });

const express = require('express');
const request = require('request');
const { URLSearchParams } = require('url');

const PORT = 8888;

const client_id = 'e0d4309aea4e4591a6a533ba32c1c836';
const client_secret = process.env.SECRET_KEY;
const redirect_uri = 'http://localhost:8888/callback';

const app = express();

app.get('/callback', function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  const queryString = new URLSearchParams({
    error: 'state_mismatch',
  }).toString();

  if (state === null) {
    res.redirect('/#' + queryString);
  } else {
    const authOptions = {
      // body of POST request
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    // exchanges authorization code for access token
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        };

        res.redirect(
          'http://localhost:3000/#' +
            new URLSearchParams({
              access_token: access_token,
              refresh_token: refresh_token,
            }).toString()
        );
      } else {
        res.redirect(
          '/#' + new URLSearchParams({ error: 'invalid_token' }).toString()
        );
      }
    });
  }
});

// get new access token once current one has expired
app.get('/refresh_token', function (req, res) {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token: access_token });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
