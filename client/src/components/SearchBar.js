import '../css/SearchBar.css';

function SearchBar(props) {
  const { resultsVisible, search } = props;

  return (
    <div className='search-bar'>
      <input
        className={`${resultsVisible}`}
        type='search'
        placeholder='Search for a song'
        onChange={(e) => {
          search(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
