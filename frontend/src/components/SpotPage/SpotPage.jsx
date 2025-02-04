import './SpotPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import SpotReviewButton from '../SpotReviewModal/SpotReviewButton';
import { useModal } from '../../context/Modal';
import { fetchSpotDetails } from '../../store/session';
import RemoveReviewModal from '../RemoveReviewModal/RemoveReviewModal';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';

const GoldStar = () => (
  <div style={{ color: 'gold' }}>
    <FaStar />
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const spot = useSelector(state => state.session.spotDetails);
  const reviews = spot?.Reviews || [];
  const user = useSelector(state => state.session.user);
  const isLoading = !spot;

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  const hasUserReviewed = reviews?.some(review => review.User?.id === user?.id);

  const calculateAvgRating = () => {
    if (!reviews || reviews.length === 0) return 'New';
    const totalStars = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const handleDelete = (reviewId) => {
    setModalContent(
      <RemoveReviewModal
        reviewId={reviewId}
        onDelete={() => dispatch(fetchSpotDetails(spotId))} 
      />
    );
  };

  const handleEditClick = (review) => {
    setModalContent(
      <UpdateReviewModal
        review={review}
        onUpdate={() => dispatch(fetchSpotDetails(spotId))}
      />
    );
  };

  if (isLoading) return <div>Loading spot...</div>;

  if (!spot) return <div>No spot found for ID: {spotId}</div>;

  const avgRating = calculateAvgRating();

  console.log("SPOT DETAILS WITH REVIEWS:", spot)

  return (
    <div className="spot-container">
      <h1 className="spot-header">{spot.name}</h1>
      <h3 className="location-header">{spot.city}, {spot.state}, {spot.country}</h3>
      <br />
      <div className="image-container">
        <div className="preview-image-container">
          <img src={spot.previewImage} alt={spot.name} />
        </div>
        <div className="image-grid">
          {spot.SpotImages?.slice(1).map((image) => (
            <img key={image.id} src={image.url} alt={`Image of ${spot.name}`} />
          ))}
        </div>
      </div>

      <div className="spot-details-container">
        <div className="description-container">
          <h2 className="hosted">
            Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>
        <div className="reserve-container">
          <div className="upper-res-container">
            <div className="spot-price-box">
              <p>${spot.price} / night</p>
            </div>
            <div className="rating-reviews">
              <GoldStar /> {avgRating}
              {reviews.length > 0 && (
                <>
                  <span className="small-period"> · </span>
                  <p>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
                </>
              )}
            </div>
          </div>
          <div className="reserve-btn">
            <button type="button" onClick={() => alert('Feature coming soon')}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div className="reviews-container">
        <div className="reviews-header">
          <GoldStar />
          <h3>{avgRating}</h3>
          {reviews.length > 0 && (
            <>
              <span className="large-period"> · </span>
              <p>{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
            </>
          )}
        </div>
        {user && user.id !== spot.Owner.id && !hasUserReviewed && (
          <div className="post-review-btn">
            <SpotReviewButton 
              spot={spot} 
              onNewReview={() => dispatch(fetchSpotDetails(spotId))}
            />
          </div>
        )}
        <br />
        <div className='main-review-container'>
          {reviews.filter((review) => review?.id).map((review) => (
            <div key={review.id} className="review-card">
              <div className="reviewer">
                <div className="reviewer-stars">
                  <GoldStar /> {review.stars}
                </div>
                <p>{review.User?.firstName || 'Unknown User'}</p>
              </div>
              <div className="review-date">
                <p>{formatDate(review.createdAt)}</p>
              </div>
              <div className="review-text">
                <p>{review.review}</p>
              </div>
              {user && user.id === review.User?.id && (
                <div className="review-actions">
                  <button onClick={() => handleEditClick(review)}>Edit</button>
                  <button onClick={() => handleDelete(review.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotPage;
