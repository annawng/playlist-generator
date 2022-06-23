import Song from './Song.js';

function Recommendations(props) {
  const { recommendations } = props;
  const songs = recommendations.map((song, index) => (
    <Song song={song} key={index} />
  ));

  return (
    <section>
      <h1>Recommendations</h1>
      {recommendations.length === 0 ? <p>No songs found</p> : songs}
    </section>
  );
}

export default Recommendations;
