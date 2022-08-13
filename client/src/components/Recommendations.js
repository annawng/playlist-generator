import { useState, useEffect } from 'react';
import { after } from 'underscore';
import { PuffLoader } from 'react-spinners';
import Song from './Song.js';

import '../css/Recommendations.css';

function Recommendations(props) {
  const { recommendations, selected, playlist, addToPlaylist, handleOnClick } =
    props;
  const { name, artist } = selected;

  const [loading, setLoading] = useState(true);
  const onLoad = after(recommendations.length, () => setLoading(false));

  const songs = recommendations.map((song, index) => (
    <Song
      song={song}
      key={index}
      button={containsSong(song) ? 'Remove' : 'Add'}
      addSong={() => addToPlaylist(song)}
      onLoad={onLoad}
      large={true}
    />
  ));

  useEffect(() => {
    setLoading(true);
  }, [selected]);

  function containsAll() {
    return playlist.length === recommendations.length;
  }

  function containsSong(song) {
    return playlist.find((obj) => obj.id === song.id);
  }

  return (
    <section className='recommendations'>
      <div className='recommendations__heading'>
        <h3>
          Similar to {name} by {artist}
        </h3>
        <button
          className={`button-primary ${loading ? '' : 'visible'}`}
          onClick={() => {
            containsAll() ? handleOnClick([]) : handleOnClick(recommendations);
          }}
        >
          {containsAll() ? 'Remove All' : 'Add All'}
        </button>
      </div>
      <div className='recommendations__spinner'>
        <PuffLoader
          color={'#1E2129'}
          loading={loading}
          cssOverride={{ width: '70px', height: '70px' }}
        />
      </div>
      <div
        className='recommendations__songs'
        style={loading ? { visibility: 'hidden' } : {}}
      >
        {recommendations.length === 0 ? <p>No songs found</p> : songs}
      </div>
    </section>
  );
}

export default Recommendations;
