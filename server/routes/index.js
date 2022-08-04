require('dotenv').config({ path: '../.env' });

const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

const router = express.Router();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.SECRET_KEY;
const redirectUri = process.env.REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

router.get('/', function (req, res) {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
});

router.get('/login', function (req, res) {
  const state = generateRandomString(16);
  const scope = [
    'user-read-email',
    'user-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
  ];
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      JSON.stringify({
        response_type: 'code',
        client_id: spotifyApi.getClientId,
        scope: scope,
        redirect_uri: spotifyApi.redirectUri,
        state: state,
      })
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

router.get('/search', function (req, res) {
  const query = req.query.q;
  spotifyApi.searchTracks(query).then(
    function (data) {
      res.json(data.body.tracks.items);
    },
    function (err) {
      console.error(err);
    }
  );
});

router.get('/recommendations', function (req, res) {
  const track = req.query.track;
  spotifyApi.getRecommendations({ seed_tracks: [track] }).then(
    function (data) {
      res.json(data.body.tracks);
    },
    function (err) {
      console.error(err);
    }
  );
});

async function exportPlaylist(req, res) {
  const playlistUri = await createPlaylist();
  addToPlaylist(playlistUri.split(':')[2]);
  // ideally don't refresh page when returning
  res.redirect('http://localhost:3000');
}

function generateRandomString(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const createPlaylist = async () => {
  try {
    const response = await spotifyApi.createPlaylist('Your Playlist', {
      public: false,
    });
    return response.body.uri;
  } catch (err) {
    console.log(err);
  }
};

const addToPlaylist = async (playlistUri) => {
  // const uris = playlist.map((track) => track.uri); // need to get this from PlaylistPage.js

  const uris = ['spotify:track:4cOdK2wGLETKBW3PvgPWqT'];
  try {
    await spotifyApi.addTracksToPlaylist(playlistUri, uris);
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
