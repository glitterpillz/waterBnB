import './SpotDetails.css';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function SpotDetails() {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);

  const calculateAvgRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 'New';
    const totalStars = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const fetchSpots = useCallback(async () => {
    try {
      const response = await fetch('/api/spots');
      const data = await response.json();
      const spotsWithRatings = data.Spots.map((spot) => ({
        ...spot,
        avgRating: calculateAvgRating(spot.Reviews || []),
      }));
      setSpots(spotsWithRatings);
    } catch (err) {
      setError('Failed to load spots');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="spots-container">
      {spots.length > 0 ? (
        spots.map((spot) => (
          <div key={spot.id} className="spot-card" title={spot.name}>
            <Link to={`/spots/${spot.id}`}>
              <img src={spot.previewImage} alt={spot.name} className="spot-image" />
              <div className="spot-details">
                <div className="spot-top">
                  <div className="spot-location">
                    {spot.city}, {spot.state}
                  </div>
                  <div className="spot-rating">⭐ {spot.avgRating || 'New'}</div>
                </div>
                <div className="spot-price">${spot.price} night</div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div>No spots available</div>
      )}
    </div>
  );
}

export default SpotDetails;
