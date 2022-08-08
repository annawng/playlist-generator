import { useState, useEffect, forwardRef } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';

import '../css/SearchPage.css';

function SearchPage(props, ref) {
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
    let timer = setTimeout(() => {
      if (query) {
        getResults(query, setResults);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section className='search-page' ref={ref}>
      <h4>Step One</h4>
      <p>Find a song you want your recommendations to be based on.</p>
      <SearchBar
        resultsVisible={resultsVisible}
        search={(text) => {
          if (text) {
            setQuery(text);
          } else {
            setResults('');
          }
        }}
      />
      {results && (
        <Results results={results} handleOnClick={props.handleOnClick} />
      )}
    </section>
  );
}

async function getResults(searchQuery, setResults) {
  const SERVER = 'https://generate-spotify-playlists.herokuapp.com';
  try {
    const response = await fetch(`${SERVER}/search?q=${searchQuery}`, {
      headers: {
        accepts: 'application/json',
      },
    });
    const json = await response.json();
    setResults(json);
  } catch (err) {
    console.log(err);
  }
}

export default forwardRef(SearchPage);
