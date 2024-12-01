import { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';  
import { editReview } from '../../store/session';

const UpdateReviewModal = ({ review, onUpdate }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [reviewText, setReviewText] = useState(review.review || '');
    const [stars, setStars] = useState(review.stars || 0);
    const [errors, setErrors] = useState({});
    
    const isValid = () => reviewText.length >= 1 && stars >= 1;

    useEffect(() => {
        setErrors({});
    }, [reviewText, stars]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReviewData = { review: reviewText, stars };
        console.log(updatedReviewData);

        try {
            const response = await dispatch(editReview(review.id, updatedReviewData));
            if (response) {
                console.log('Updated review:', response);
                if (onUpdate) onUpdate(response);
                closeModal();
            }
        } catch (err) {
            setErrors({ form: err.message || 'Failed to update review. Please try again later.' });
        }
    };

    const handleStarClick = (starValue) => {
        setStars(starValue); 
    };

    return (
        <div className='review-modal-container'>
            <h2>Edit Review</h2>
            <form className='add-review-form' onSubmit={handleSubmit}>
                <label>
                    <textarea
                        placeholder='Edit your review...'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                    {errors.review && <span className='error'>{errors.review}</span>}
                </label>

                <label>
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
                    <button type="submit" disabled={!isValid()}>Submit</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReviewModal;
