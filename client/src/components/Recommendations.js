import Song from './Song.js';

import '../css/Recommendations.css';

function Recommendations(props) {
  const { recommendations } = props;
  const songs = recommendations.map((song, index) => (
    <Song song={song} key={index} />
  ));

  return (
    <section className='recommendations'>
      <h2>Recommendations</h2>
      {recommendations.length === 0 ? <p>No songs found</p> : songs}
    </section>
  );
}

export default Recommendations;
