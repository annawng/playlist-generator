import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RecommendationPage from './components/RecommendationPage';
import PlaylistPage from './components/PlaylistPage';

import './css/App.css';

function App() {
  const [selected, setSelected] = useState('');
  const [playlist, setPlaylist] = useState('');

  const searchPageRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8888/');
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
          setSelected(selected);
          setPlaylist('');
        }}
      />
      {selected && (
        <RecommendationPage
          selected={selected}
          addToPlaylist={(song) => {
            setPlaylist([...playlist, song]);
          }}
          handleOnClick={(playlist) => {
            setPlaylist(playlist);
          }}
        />
      )}
      {playlist && (
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
