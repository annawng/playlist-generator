import { useState, useEffect, forwardRef } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

import '../css/SearchPage.css';

function SearchPage(props, ref) {
  const { token, handleOnClick } = props;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [resultsVisible, setResultsVisible] = useState('');

  // useEffect(() => {
  //   const res = window.sessionStorage.getItem('results');
  //   if (res) {
  //     setResults(JSON.parse(res));
  //   }
  // }, []);

  useEffect(() => {
    // window.sessionStorage.setItem('results', JSON.stringify(results));
    results.length !== 0
      ? setResultsVisible('results-visible')
      : setResultsVisible('');
  }, [results]);

  // only search when user has stopped typing
  useEffect(() => {
    async function getResults(searchQuery) {
      const BASE_URI = 'https://api.spotify.com/v1';
      const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        Host: 'api.spotify.com',
      };

      try {
        const res = await fetch(
          BASE_URI + `/search?q=${searchQuery}&type=track`,
          {
            method: 'GET',
            headers: headers,
          }
        );
        const json = await res.json();
        setResults(json.tracks.items);
      } catch (err) {
        console.log(err);
      }
    }

    let timer = setTimeout(() => {
      if (query) {
        getResults(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, token]);

  return (
    <section className='search-page' ref={ref}>
      <h4>Step One</h4>
      <p>Find a song you want your recommendations to be based on.</p>
      <SearchBar
        resultsVisible={resultsVisible}
        search={(text) => {
          if (text.trim()) {
            setQuery(text);
          } else {
            setResults('');
          }
        }}
      />
      {results && <Results results={results} handleOnClick={handleOnClick} />}
    </section>
  );
}

export default forwardRef(SearchPage);
