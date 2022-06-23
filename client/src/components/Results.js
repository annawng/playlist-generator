import Song from './Song.js';

function Results(props) {
  const { results, handleOnClick } = props;
  const songs = results.map((song, index) => (
    <Song song={song} key={index} handleOnClick={(id) => handleOnClick(id)} />
  ));

  return (
    <section>
      <h1>Results</h1>
      {results.length === 0 ? <p>No songs found</p> : songs}
    </section>
  );
}

export default Results;
