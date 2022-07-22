import Song from './Song.js';

import '../css/Recommendations.css';

function Recommendations(props) {
  const { recommendations, selected } = props;
  const { name, artist } = selected;
  const songs = recommendations.map((song, index) => (
    <Song song={song} key={index} />
  ));

  return (
    <section className='recommendations'>
      <h2>Recommendations</h2>
      <p>
        for {name} by {artist}
      </p>
      <div className='recommendations__songs'>
        {recommendations.length === 0 ? <p>No songs found</p> : songs}
      </div>
    </section>
  );
}

export default Recommendations;
