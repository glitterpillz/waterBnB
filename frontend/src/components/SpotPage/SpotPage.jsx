import './SpotPage.css'

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import SpotReviewButton from '../SpotReviewModal/SpotReviewButton';
import { useModal } from '../../context/Modal';
import RemoveReviewModal from '../RemoveReviewModal/RemoveReviewModal';

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
  const { setModalContent } = useModal();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const user = useSelector(state => state.session.user);

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

  const calculateAvgRating = () => {
    if (!reviews || reviews.length === 0) return 'New';
    const totalStars = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return (totalStars / reviews.length).toFixed(1);
  }; 

  // const handleDelete = async (reviewId) => {
  //   try {
  //     await dispatch(removeReview(reviewId));

  //     setReviews(reviews.filter(review => review.id !== reviewId));
  //   } catch (err) {
  //     console.error('Error deleting review:', err);
  //   }
  // }

  const handleDelete = (reviewId) => {
    setModalContent(
      <RemoveReviewModal reviewId={reviewId} />  // Trigger the RemoveReviewModal
    );
  }

  if (isLoading) {
    return <div>Loading spot...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spot) {
    return <div>No spot found for ID: {spotId}</div>;
  }  

  const avgRating = calculateAvgRating();

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
              <div className='spot-price-box'>
                <p>${spot.price} / night</p>
              </div>
              <div className='rating-reviews'>
                <GoldStar /> {avgRating} 
                <span> · </span>
                <p>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
              </div>
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
            <h3>{avgRating}</h3>
            <span> · </span>
            <p>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
          </div>
          <div className='post-review-btn'>
            <SpotReviewButton spot={spot} />
          </div>
          <br />
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
                {user && user.id === review.User.id && (
                  <div className='review-actions'>
                    {/* <button onClick={() => handleEdit(review)}>Edit</button> */}
                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Be the first to post a review!</p>
          )}

        </div>
    </div>
  );
}

export default SpotPage;