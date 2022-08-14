import { useState, useEffect, forwardRef } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

import '../css/SearchPage.css';

function SearchPage(props, ref) {
  const { token, handleOnClick } = props;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [resultsVisible, setResultsVisible] = useState('');
  const [searchPageClass, setSearchPageClass] = useState('search-page');

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
      if (query.trim()) {
        getResults(query);
      } else {
        setResults('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, token]);

  return (
    <section className={searchPageClass} ref={ref}>
      <h4>Step One</h4>
      <p>Find a song you want your recommendations to be based on.</p>
      <SearchBar
        resultsVisible={resultsVisible}
        search={(text) => {
          setQuery(text);
        }}
      />
      {results && (
        <Results
          results={results}
          handleOnClick={(selected) => {
            handleOnClick(selected);
            setSearchPageClass('search-page fit-content');
          }}
        />
      )}
    </section>
  );
}

export default forwardRef(SearchPage);
