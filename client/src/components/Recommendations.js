import Song from './Song.js';

import '../css/Recommendations.css';

function Recommendations(props) {
  const { recommendations, selected, playlist, addToPlaylist, handleOnClick } =
    props;
  const { name, artist } = selected;
  const songs = recommendations.map((song, index) => (
    <Song
      song={song}
      key={index}
      button={containsSong(song) ? 'Remove from playlist' : 'Add to playlist'}
      addSong={() => addToPlaylist(song)}
    />
  ));

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
          className='button-primary'
          onClick={() => {
            containsAll() ? handleOnClick([]) : handleOnClick(recommendations);
          }}
        >
          {containsAll() ? 'Remove all from playlist' : 'Add all to playlist'}
        </button>
      </div>
      <div className='recommendations__songs'>
        {recommendations.length === 0 ? <p>No songs found</p> : songs}
      </div>
    </section>
  );
}

export default Recommendations;
