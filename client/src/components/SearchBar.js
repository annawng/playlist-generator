import '../css/SearchBar.css';

function SearchBar(props) {
  const { search } = props;

  return (
    <div className='search-bar'>
      <input
        type='search'
        placeholder='Search for a song'
        onChange={(evt) => {
          search(evt.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
