import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import Recommendations from './Recommendations';

function SearchPage(props) {
  const [results, setResults] = useState('');
  const [recommendations, setRecommendations] = useState('');

  return (
    <section>
      <SearchBar
        search={(text) => {
          if (text) {
            getResults(props.token, text, setResults);
          } else {
            setResults('');
          }
        }}
        clear={() => setResults('')}
      />
      {results && (
        <Results
          results={results}
          token={props.token}
          handleOnClick={(selected) =>
            getRecommendations(props.token, selected, setRecommendations)
          }
        />
      )}
      {recommendations && <Recommendations recommendations={recommendations} />}
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
    .then((json) => setResults(json.tracks.items))
    .catch((err) => console.log(err));
}

function getRecommendations(token, selected, setRecommendations) {
  const BASE_URI = 'https://api.spotify.com/v1';
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
    Host: 'api.spotify.com',
  };

  fetch(BASE_URI + `/recommendations?seed_tracks=${selected}`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => setRecommendations(json.tracks))
    .catch((err) => console.log(err));
}

export default SearchPage;
