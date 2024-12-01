// import './SpotReviewModal.css';
// import { useState } from 'react';
// import { useModal } from '../../context/Modal';
// import { useDispatch } from 'react-redux';  
// import { createReview } from '../../store/session'; 

// const ReviewFormModal = ({ spot }) => {
//     const { closeModal } = useModal();
//     const dispatch = useDispatch(); 

//     const spotId = spot.id;
    
//     const [review, setReview] = useState('');
//     const [stars, setStars] = useState('');
//     const [errors, setErrors] = useState({});

//     const isValid = () => review.length >= 1 && stars >= 1;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const reviewData = { review, stars, spotId };
    
//         try {
//             const response = await dispatch(createReview(spotId, reviewData));

//             if (response) {
//                 console.log(response);
//                 closeModal();
//             }
//         } catch (err) {
//             setErrors({ form: err.message || 'Failed to submit review. Please try again later.' });
//         }
//     };
    

//     return (
//         <div className='review-modal-container'>
//             <h2>Add a Review</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Review:
//                     <textarea
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         required
//                     />
//                     {errors.review && <span className='error'>{errors.review}</span>}
//                 </label>
//                 <label>
//                     Stars:
//                     <input
//                         type="number"
//                         min="1"
//                         max="5"
//                         value={stars}
//                         onChange={(e) => setStars(Number(e.target.value))}
//                         required
//                     />
//                     {errors.stars && <span className='error'>{errors.stars}</span>}
//                 </label>
//                 {errors.form && <span className='error'>{errors.form}</span>}
//                 <button type="submit" disabled={!isValid()}>Submit</button>
//                 <button type="button" onClick={closeModal}>Cancel</button>
//             </form>        
//         </div>
//     );
// };

// export default ReviewFormModal;

import './SpotReviewModal.css';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';  
import { createReview } from '../../store/session'; 

const ReviewFormModal = ({ spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch(); 

    const spotId = spot.id;
    
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0); // Initialize stars with 0
    const [errors, setErrors] = useState({});

    const isValid = () => review.length >= 1 && stars >= 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reviewData = { review, stars, spotId };
    
        try {
            const response = await dispatch(createReview(spotId, reviewData));

            if (response) {
                console.log(response);
                closeModal();
            }
        } catch (err) {
            setErrors({ form: err.message || 'Failed to submit review. Please try again later.' });
        }
    };

    const handleStarClick = (starValue) => {
        setStars(starValue); // Update the stars state on click
    };

    return (
        <div className='review-modal-container'>
            <h2>Add a Review</h2>
            <br />
            <form className='add-review-form' onSubmit={handleSubmit}>
                <label>
                    <textarea
                        placeholder='Write your review...'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
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
                                onClick={() => handleStarClick(starValue)} // Handle click event
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

export default ReviewFormModal;