import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';

const AddReviewModal = ({ spotId }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = await dispatch(sessionActions.createReview({ spotId, review, stars }));
    
        if (newReview) {
            closeModal();
        } else {
            alert('Failed to submit review');
        }
    };

    return (
        <div className='modal'>
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Review:
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                </label>
                <label>
                Stars:
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    required
                />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>
                Cancel
                </button>
            </form>        
      </div>
    )
}

export default AddReviewModal;