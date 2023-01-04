import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RecommendationPage from './components/RecommendationPage';
import PlaylistPage from './components/PlaylistPage';

import './css/App.css';

function App() {
  const [selected, setSelected] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [token, setToken] = useState('');

  const searchPageRef = useRef(null);

  const SERVER = 'https://playlistgenerator.onrender.com';

  const updateSelected = async (selected) => {
    setSelected(selected);
    if (selected) {
      await fetch(`${SERVER}/selected`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ selected: selected }),
      });
    }
  };

  const updatePlaylist = async (playlist) => {
    setPlaylist(playlist);
    const uris = playlist.map((song) => song.uri);
    await fetch(`${SERVER}/playlist`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ playlist: uris }),
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${SERVER}/token`);
        const json = await res.json();
        setToken(json.token);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return (
    <div className='app'>
      <HomePage
        handleOnClick={() =>
          searchPageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <SearchPage
        token={token}
        handleOnClick={(selected) => {
          updateSelected(selected);
          updatePlaylist([]);
        }}
        ref={searchPageRef}
      />
      {selected && (
        <RecommendationPage
          token={token}
          selected={selected}
          playlist={playlist}
          addToPlaylist={(song) => {
            const containsSong = playlist.find((obj) => obj.id === song.id);
            containsSong
              ? updatePlaylist(playlist.filter((obj) => obj.id !== song.id))
              : updatePlaylist([...playlist, song]);
          }}
          handleOnClick={(playlist) => {
            updatePlaylist(playlist);
          }}
        />
      )}
      {playlist.length !== 0 && (
        <PlaylistPage
          playlist={playlist}
          handleOnClick={() =>
            searchPageRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        />
      )}
    </div>
  );
}

export default App;
