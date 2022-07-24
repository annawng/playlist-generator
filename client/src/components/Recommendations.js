import Song from './Song.js';

import '../css/Recommendations.css';

function Recommendations(props) {
  const { recommendations, selected, handleOnClick } = props;
  const { name, artist } = selected;
  const songs = recommendations.map((song, index) => (
    <Song song={song} key={index} />
  ));

  return (
    <section className='recommendations'>
      <div className='recommendations__heading'>
        <h3>
          Similar to {name} by {artist}
        </h3>
        <button onClick={() => handleOnClick(recommendations)}>
          Add all to playlist
        </button>
      </div>
      <div className='recommendations__songs'>
        {recommendations.length === 0 ? <p>No songs found</p> : songs}
      </div>
    </section>
  );
}

export default Recommendations;
