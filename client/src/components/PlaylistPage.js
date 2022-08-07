import Playlist from './Playlist';

import '../css/PlaylistPage.css';

const clientId = 'e0d4309aea4e4591a6a533ba32c1c836';
const redirectUri = 'http://localhost:8888/callback';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'code';
const scope = 'playlist-modify-private';
const state = generateRandomString(16);
const loginLink =
  `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}` +
  `&response_type=${responseType}&state=${state}&scope=${scope}`;

function PlaylistPage(props) {
  const { playlist, handleOnClick } = props;

  const exportPlaylist = async () => {
    window.location.href = loginLink;
  };

  return (
    <section className='playlist-page'>
      <div className='playlist-page__heading'>
        <h4>Step Three</h4>
        <p>Export your new playlist to Spotify.</p>
      </div>
      <h2>Your Playlist</h2>
      {<Playlist playlist={playlist} />}
      <div className='playlist-page__buttons'>
        <button className='button-primary' onClick={exportPlaylist}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='currentColor'
            className='bi bi-spotify'
            viewBox='0 0 16 16'
          >
            <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z' />
          </svg>
          Export to Spotify
        </button>
        <button className='button-secondary' onClick={handleOnClick}>
          Back to search
        </button>
      </div>
    </section>
  );
}

function generateRandomString(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default PlaylistPage;
