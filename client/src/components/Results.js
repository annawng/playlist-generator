import Song from './Song.js';

import '../css/Results.css';

function Results(props) {
  const { results, handleOnClick } = props;
  const songs = results.map((song, index) => (
    <Song
      song={song}
      key={index}
      handleOnClick={(selected) => handleOnClick(selected)}
    />
  ));

  return (
    <section className='results'>
      {results.length === 0 ? (
        <p>No songs found</p>
      ) : (
        <div className='results__songs'>{songs}</div>
      )}
    </section>
  );
}

export default Results;
