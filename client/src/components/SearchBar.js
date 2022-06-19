import { useState } from 'react';
function SearchBar(props) {
  const { search, clear } = props;
  const [text, setText] = useState('');

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
          if (text) {
            search(text);
          }
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
