import { useState, useEffect } from 'react';
import Recommendations from './Recommendations';

function RecommendationPage(props) {
  const { token, selected } = props;

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
          BASE_URI + `/recommendations?seed_tracks=${selected}`,
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
    <section>
      {recommendations && <Recommendations recommendations={recommendations} />}
    </section>
  );
}

export default RecommendationPage;
