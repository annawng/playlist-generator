import { useState, useEffect } from 'react';

function Album(props) {
  const [album, setAlbum] = useState('');

  const BASE_URI = 'https://api.spotify.com/v1';

  useEffect(() => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Host: 'api.spotify.com',
    };

    fetch(BASE_URI + `/albums/${props.id}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => setAlbum(json))
      .catch((err) => console.log(err));
  }, [props.token, props.id]);

  if (album) {
    return <section>{displayAlbum(album)}</section>;
  }
}

function displayAlbum(album) {
  const { artists, images, name } = album;
  const artist = artists[0].name;
  const image = images[0].url;
  console.log(artist);
  console.log(image);
  console.log(name);
}

export default Album;
