import { useState, useEffect } from 'react';
import Recommendations from './Recommendations';

import '../css/RecommendationPage.css';

function RecommendationPage(props) {
  const { token, selected, handleOnClick } = props;

  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    const getRecommendations = async () => {
      const BASE_URI = 'https://api.spotify.com/v1';
      const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        Host: 'api.spotify.com',
      };

      try {
        const response = await fetch(
          BASE_URI + `/recommendations?seed_tracks=${selected.id}`,
          {
            method: 'GET',
            headers: headers,
          }
        );
        const json = await response.json();
        setRecommendations(json.tracks);
      } catch (err) {
        console.log(err);
      }
    };

    getRecommendations();
  }, [token, selected]);

  return (
    <section className='recommendation-page'>
      <div className='recommendation-page__heading'>
        <h4>Step Two</h4>
        <p>
          Check out the recommendations and add the songs you like to your
          playlist.
        </p>
      </div>
      <div className='recommendation-page__recommendations'>
        {recommendations && (
          <Recommendations
            recommendations={recommendations}
            selected={selected}
            handleOnClick={handleOnClick}
          />
        )}
      </div>
    </section>
  );
}

export default RecommendationPage;
