import '../css/Song.css';

function Song(props) {
  const { song, handleOnClick, button, addSong, onLoad, large } = props;
  const { album, artists, name, id } = song;
  let artist = artists[0] ? artists[0].name : '';
  const imageSmall = album.images.at(-1) ? album.images.at(-1).url : '';
  const imageLarge = album.images[0] ? album.images[0].url : '';

  return (
    <div
      className={'song'}
      onClick={() =>
        handleOnClick && handleOnClick({ id: id, name: name, artist: artist })
      }
    >
      <img
        src={large ? imageLarge : imageSmall}
        alt={`Album art for ${name}`}
        onLoad={onLoad}
      />
      <div>
        <p className='song__name'>{name}</p>
        <p className='song__artist'>{artist}</p>
      </div>
      {button && <button onClick={addSong}>{button}</button>}
    </div>
  );
}

export default Song;
