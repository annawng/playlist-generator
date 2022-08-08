require('dotenv').config({ path: '../.env' });

const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

const router = express.Router();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;
const clientUri = process.env.CLIENT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

let playlist, selected;

router.post('/selected', function (req, res) {
  selected = req.body.selected;
});

router.post('/playlist', function (req, res) {
  playlist = req.body.playlist;
});

router.get('/token', function (req, res) {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      res.json({ token: data.body['access_token'] });
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
});

router.get(
  '/callback',
  function (req, res, next) {
    const code = req.query.code;

    spotifyApi.authorizationCodeGrant(code).then(
      function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        next();
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  },
  exportPlaylist
);

// get new access token once current one has expired
router.get('/refresh_token', function (req, res) {
  spotifyApi.refreshAccessToken().then(
    function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
      console.log('Could not refresh access token', err);
    }
  );
});

async function exportPlaylist(req, res) {
  const playlistUri = await createPlaylist();
  addToPlaylist(playlistUri.split(':')[2]);
  res.redirect(clientUri);
}

const createPlaylist = async () => {
  try {
    const response = await spotifyApi.createPlaylist(
      `Based on ${selected.name} by ${selected.artist}`,
      {
        public: false,
      }
    );
    return response.body.uri;
  } catch (err) {
    console.log(err);
  }
};

const addToPlaylist = async (playlistUri) => {
  try {
    await spotifyApi.addTracksToPlaylist(playlistUri, playlist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
