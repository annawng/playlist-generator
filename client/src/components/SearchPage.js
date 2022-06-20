import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

function SearchPage(props) {
  const [results, setResults] = useState('');

  return (
    <section>
      <SearchBar
        token={props.token}
        search={(text) => {
          getResults(props.token, text, setResults);
        }}
        clear={() => setResults('')}
      />
      {results && <Results results={results} />}
    </section>
  );
}

function getResults(token, searchQuery, setResults) {
  const BASE_URI = 'https://api.spotify.com/v1';
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
    Host: 'api.spotify.com',
  };

  fetch(BASE_URI + `/search?q=${searchQuery}&type=track`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => setResults(json['tracks']['items']))
    .catch((err) => console.log(err));
}

export default SearchPage;
