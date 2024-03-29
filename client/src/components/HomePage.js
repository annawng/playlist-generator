import '../css/HomePage.css';

function HomePage(props) {
  const { handleOnClick } = props;

  return (
    <section className='home-page'>
      <div className='home-page__heading'>
        <h1>Spotify Playlist Generator</h1>
        <p>Select a song and get recommendations.</p>
        <button onClick={handleOnClick}>
          Get Started
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-chevron-down'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
            />
          </svg>
        </button>
      </div>
      <div></div>
    </section>
  );
}

export default HomePage;
