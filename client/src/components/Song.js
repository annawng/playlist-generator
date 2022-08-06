import '../css/Song.css';

function Song(props) {
  const { song, handleOnClick, button, addSong } = props;
  const { album, artists, name, id } = song;
  let artist = artists[0] ? artists[0].name : '';
  const image = album.images[0] ? album.images[0].url : '';

  return (
    <div
      className={'song'}
      onClick={() =>
        handleOnClick && handleOnClick({ id: id, name: name, artist: artist })
      }
    >
      <img src={image} alt={`Album art for ${name}`} />
      <div>
        <p className='song__name'>{name}</p>
        <p className='song__artist'>{artist}</p>
      </div>
      {button && (
        <button className='button-secondary' onClick={addSong}>
          {button}
        </button>
      )}
    </div>
  );
}

export default Song;
