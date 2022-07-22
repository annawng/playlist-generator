import '../css/Song.css';

function Song(props) {
  const { song, handleOnClick } = props;
  const { album, artists, name, id } = song;
  let artist = artists[0].name;
  const image = album.images[0].url;

  return (
    <div
      className='song'
      onClick={() => handleOnClick({ id: id, name: name, artist: artist })}
    >
      <img src={image} alt={`Album art for ${name}`} />
      <div>
        <p className='song__name'>{name}</p>
        <p className='song__artist'>{artist}</p>
      </div>
    </div>
  );
}

export default Song;
