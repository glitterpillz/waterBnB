import './SpotReviewModal.css';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';  
import { createReview } from '../../store/session'; 
import { fetchSpotDetails } from '../../store/session';

const ReviewFormModal = ({ spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch(); 

    const spotId = spot.id;
    
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0); 
    const [errors, setErrors] = useState({});

    const isValid = () => review.length >= 10 && stars >= 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reviewData = { review, stars, spotId };
    
        try {
            const response = await dispatch(createReview(spotId, reviewData));

            if (response) {
                closeModal();
                dispatch(fetchSpotDetails(spotId))
            }
        } catch (err) {
            setErrors({ form: err.message || 'Failed to submit review. Please try again later.' });
        }
    };

    const handleStarClick = (starValue) => {
        setStars(starValue);
    };

    return (
        <div className='review-modal-container'>
            <h2>How was your stay?</h2>
            {errors.form && <div className='error-message'>{errors.form}</div>}
            <br />
            <form className='add-review-form' onSubmit={handleSubmit}>
                <label>
                    <textarea
                        placeholder='Leave your review here...'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                    {errors.review && <span className='error'>{errors.review}</span>}
                </label>

                <label className='stars'>
                    Stars:
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                            <span
                                key={starValue}
                                className={`star-icon ${stars >= starValue ? 'filled' : ''}`}
                                onClick={() => handleStarClick(starValue)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {errors.stars && <span className='error'>{errors.stars}</span>}
                </label>

                {errors.form && <span className='error'>{errors.form}</span>}
                <div className='review-modal-btns'>
                    <button type="submit" disabled={!isValid()}>Submit Your Review</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>        
        </div>
    );
};

export default ReviewFormModal;