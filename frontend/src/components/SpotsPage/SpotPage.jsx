import './SpotPage.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const GoldStar = () => {
  return (
    <div style={{ color: 'gold' }}>
      <FaStar />
    </div>
  )
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function SpotPage() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spot');
        }
        const data = await response.json();
        setSpot(data);
        setReviews(data.Reviews || []);
        console.log(data.Reviews); 
      } catch (err) {
        setError('Failed to load spot: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSpot();
  }, [spotId]);

  

  if (isLoading) {
    return <div>Loading spot...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spot) {
    return <div>No spot found for ID: {spotId}</div>;
  }  

  return (
    <div className='spot-container'>
        <h1 className='spot-header'>{spot.name}</h1>
        <h3 className='location-header'>{spot.city}, {spot.state}, {spot.country}</h3>
        <div className='image-container'>
          <div className='preview-image-container'>
              <img src={spot.previewImage} alt={spot.name} />
          </div>

          <div className='image-grid'>
              {spot.SpotImages.slice(1).map(image => (
              <img key={image.id} src={image.url} alt={`Image of ${spot.name}`} />
              ))}
          </div>
        </div>
        <div className='spot-details-container'>
          <div className='description-container'>
            <h2 className='hosted'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
            <p>{spot.description}</p>
          </div>
          <div className='reserve-container'>
            <div className='upper-res-container'>
              <p>${spot.price}/night</p>
              <GoldStar />
            </div>
            <div className='reserve-btn'>
              <button type='button' onClick={() => alert('Feature coming soon')}>
                Reserve
              </button>
            </div>
          </div>
        </div>

        <br />      
        <hr />
        <br />

        <div className='reviews-container'>
          <div className='reviews-header'>
            <GoldStar />
            <h3>4.5</h3>
            <p>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
          </div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className='review-card'>
                <div className='reviewer'>
                  <div className='reviewer-stars'>
                    <GoldStar /> {review.stars}
                  </div>
                    <p>{review.User?.firstName}</p>
                </div>
                <div className='review-date'>
                  <p>{formatDate(review.createdAt)}</p>
                </div>
                <div className='review-text'>
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}

        </div>
    </div>
  );
}

export default SpotPage;