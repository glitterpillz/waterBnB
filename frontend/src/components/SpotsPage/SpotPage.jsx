import './SpotPage.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SpotPage() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spot');
        }
        const data = await response.json();
        setSpot(data);

        // const reviewsResponse = await fetch (`/api/spots/${spotId}/reviews`);
        // if (!reviewsResponse.ok) {
        //   throw new Error('Failed to fetch reviews');
        // }
        // const reviewData = await reviewsResponse.json();
        // console.log(reviewData);
        // setReviews(reviewData);
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

  // function getReviews() {
  //   reviews.forEach((review) => {
  //     console.log(review.stars)
  //   })
  // }

  // console.log(getReviews(reviews))
  

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
            </div>
            <div className='reserve-btn'>
              <button type='button'>Reserve</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default SpotPage;