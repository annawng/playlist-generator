import { useState, useEffect } from 'react';

import '../App.css';

function Profile(props) {
  const [profile, setProfile] = useState('');

  const BASE_URI = 'https://api.spotify.com/v1';

  useEffect(() => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Host: 'api.spotify.com',
    };

    fetch(BASE_URI + '/me', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => setProfile(json))
      .catch((err) => console.log(err));
  }, [props.token]);

  if (profile) {
    return <section>{displayProfile(profile)}</section>;
  }
}

function displayProfile(profile) {
  const { display_name, id, images } = profile;
  const image = images[0];
  return (
    <div>
      <h1>{display_name}</h1>
      <p>{id}</p>
      <img src={image.url} alt='profile pic'></img>
    </div>
  );
}

export default Profile;
