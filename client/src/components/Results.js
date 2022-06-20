import Song from './Song.js';

function Results(props) {
  const { results } = props;
  const songs = results.map((result, index) => (
    <Song song={result} key={index} />
  ));

  return (
    <section>
      <h1>Results</h1>
      {results.length === 0 ? <p>No songs found</p> : songs}
    </section>
  );
}

export default Results;
