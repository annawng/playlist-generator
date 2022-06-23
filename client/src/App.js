import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SearchPage from './components/SearchPage';

import './App.css';

function App() {
  const [token, setToken] = useState('');

  const CLIENT_ID = 'e0d4309aea4e4591a6a533ba32c1c836';
  const REDIRECT_URI = 'http://localhost:8888/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'code';
  const LOGIN_LINK =
    `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=` +
    `${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&state=` +
    `${generateRandomString(16)}`;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== '') {
      let token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];
      setToken(token);
    }
  }, []);

  return (
    <Router>
      <div className='App'>
        <a href={LOGIN_LINK}>Login</a>
        <br />
        <br />
        <SearchPage token={token} />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
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

export default App;
