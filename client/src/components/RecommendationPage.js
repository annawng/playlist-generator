import { useState, useEffect } from 'react';
import Recommendations from './Recommendations';

import '../css/RecommendationPage.css';

function RecommendationPage(props) {
  const { selected, addToPlaylist, handleOnClick } = props;

  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    const recs = window.sessionStorage.getItem('recommendations');
    if (recs) {
      setRecommendations(JSON.parse(recs));
    }
  }, []);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await fetch(`/recommendations?track=${selected.id}`, {
          headers: {
            accepts: 'application/json',
          },
        });
        const json = await response.json();
        setRecommendations(json);
        window.sessionStorage.setItem('recommendations', JSON.stringify(json));
      } catch (err) {
        console.log(err);
      }
    };

    getRecommendations();
  }, [selected]);

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
            addToPlaylist={addToPlaylist}
            handleOnClick={handleOnClick}
          />
        )}
      </div>
    </section>
  );
}

export default RecommendationPage;
