import React, { useState, useEffect } from 'react';

function Song(props) {
  const [song, setSong] = useState('');

  const BASE_URI = 'https://api.spotify.com/v1';

  useEffect(() => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Host: 'api.spotify.com',
    };

    fetch(BASE_URI + `/tracks/${props.id}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => setSong(json))
      .catch((err) => console.log(err));
  }, [props.token, props.id]);

  if (song) {
    return <section>{displaySong(song)}</section>;
  }
}

function displaySong(song) {
  const { album, artists, name } = song;
  const artist = artists[0].name;
  const image = album.images[0].url;
  console.log(artist);
  console.log(image);
  console.log(name);

  return (
    <React.Fragment>
      <p>{name}</p>
      <p>{artist}</p>
      <img src={image} alt={`Album art for ${name}`} />
    </React.Fragment>
  );
}

export default Song;
