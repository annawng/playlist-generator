import '../Song.css';

function Song(props) {
  const { song, handleOnClick } = props;
  const { album, artists, name, id } = song;
  let artist = artists[0].name;
  for (let i = 1; i < artists.length; i++) {
    artist += `, ${artists[i].name}`;
  }
  const image = album.images[0].url;

  return (
    <div className='song' onClick={() => handleOnClick(id)}>
      <img src={image} alt={`Album art for ${name}`} />
      <div>
        <p id='name'>{name}</p>
        <p id='artist'>{artist}</p>
      </div>
    </div>
  );
}

export default Song;
