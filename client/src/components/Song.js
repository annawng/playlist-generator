import React from 'react';

function Song(props) {
  const { album, artists, name } = props.song;
  const artist = artists[0].name;
  const image = album.images[0].url;

  return (
    <React.Fragment>
      <p>{name}</p>
      <p>{artist}</p>
      <img src={image} alt={`Album art for ${name}`} />
    </React.Fragment>
  );
}

export default Song;
