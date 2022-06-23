import { useState, useEffect } from 'react';
function SearchBar(props) {
  const { search, clear } = props;
  const [text, setText] = useState('');

  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.key === 'Enter') {
        search(text);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [search, text]);

  return (
    <div>
      <input
        type='text'
        placeholder='Search for a song'
        onChange={(evt) => {
          setText(evt.target.value);
        }}
        value={text}
      />
      <button
        onClick={() => {
          search(text);
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          setText('');
          clear();
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
