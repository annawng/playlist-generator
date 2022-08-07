import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RecommendationPage from './components/RecommendationPage';
import PlaylistPage from './components/PlaylistPage';

import './css/App.css';

function App() {
  const [selected, setSelected] = useState('');
  const [playlist, setPlaylist] = useState([]);

  const searchPageRef = useRef(null);

  const updateSelected = async (selected) => {
    setSelected(selected);
    // window.sessionStorage.setItem('selected', JSON.stringify(selected));
    if (selected) {
      await fetch('/selected', {
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
    // window.sessionStorage.setItem('playlist', JSON.stringify(playlist));
    const uris = playlist.map((song) => song.uri);
    await fetch('/playlist', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ playlist: uris }),
    });
  };

  useEffect(() => {
    // const sel = window.sessionStorage.getItem('selected');
    // if (sel) {
    //   setSelected(JSON.parse(sel));
    // }

    // const pl = window.sessionStorage.getItem('playlist');
    // if (pl) {
    //   setPlaylist(JSON.parse(pl));
    // }

    const load = async () => {
      try {
        await fetch('/token');
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
        ref={searchPageRef}
        handleOnClick={(selected) => {
          updateSelected(selected);
          updatePlaylist([]);
        }}
      />
      {selected && (
        <RecommendationPage
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
