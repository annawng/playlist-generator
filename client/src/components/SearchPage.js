import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

import '../css/SearchPage.css';

function SearchPage(props) {
  const [results, setResults] = useState('');

  useEffect(() => {
    if (results.length !== 0) {
      document
        .querySelector('.search-bar input')
        .classList.add('results-visible');
    } else {
      document
        .querySelector('.search-bar input')
        .classList.remove('results-visible');
    }
  }, [results.length]);

  return (
    <section className='search-page'>
      <h3>Step One</h3>
      <p>Find a song you want your recommendations to be based on.</p>
      <SearchBar
        search={(text) => {
          if (text) {
            getResults(props.token, text, setResults);
          } else {
            setResults('');
          }
        }}
      />
      {results && (
        <Results
          results={results}
          token={props.token}
          handleOnClick={props.handleOnClick}
        />
      )}
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

export default SearchPage;
