import '../css/PlaylistPage.css';

function PlaylistPage(props) {
  return (
    <section className='playlist-page'>
      <div className='playlist-page__heading'>
        <h4>Step Three</h4>
        <p>Export your new playlist to Spotify.</p>
      </div>
      <h2>Your Playlist</h2>
      <div className='playlist-page__buttons'>
        <button>Export to Spotify</button>
        <button>Back to search</button>
      </div>
    </section>
  );
}

export default PlaylistPage;
