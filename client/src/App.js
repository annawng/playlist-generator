import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RecommendationPage from './components/RecommendationPage';
import PlaylistPage from './components/PlaylistPage';

import './css/App.css';

function App() {
  const [token, setToken] = useState('');
  const [selected, setSelected] = useState('');
  const [playlist, setPlaylist] = useState('');

  // const CLIENT_ID = 'e0d4309aea4e4591a6a533ba32c1c836';
  // const REDIRECT_URI = 'http://localhost:8888/callback';
  // const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  // const RESPONSE_TYPE = 'code';
  // const LOGIN_LINK =
  //   `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=` +
  //   `${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&state=` +
  //   `${generateRandomString(16)}`;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== '') {
      let token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];
      setToken(token);
    } else {
      window.location.href = 'http://localhost:8888/';
    }
  }, []);

  return (
    <div className='app'>
      {/*<a href={LOGIN_LINK}>Login</a> */}
      <HomePage />
      <SearchPage
        token={token}
        handleOnClick={(selected) => setSelected(selected)}
      />
      {selected && (
        <RecommendationPage
          token={token}
          selected={selected}
          handleOnClick={(playlist) => setPlaylist(playlist)}
        />
      )}
      {selected && <PlaylistPage playlist={playlist} />}
    </div>
  );
}

// function generateRandomString(length) {
//   let text = '';
//   const possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

export default App;
