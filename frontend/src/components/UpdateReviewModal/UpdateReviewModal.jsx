// import { useState } from 'react';
// import { useModal } from '../../context/Modal';
// import { useDispatch } from 'react-redux';
// import { editReview } from '../../store/session';

// const UpdateReviewModal = ({ spot, currReview }) => {
//     const { closeModal } = useModal();
//     const dispatch = useDispatch();

//     const spotId = spot.id;

//     const [review, setReview] = useState(currReview.review || '');
//     const [stars, setStars] = useState(currReview.stars || 5);
//     const [errors, setErrors] = useState({});

//     const isValid = () => review.length >= 1 && stars >= 1;

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const updatedReviewData = { review, stars, spotId };

//         try {
//             const response = await dispatch(editReview(currReview.id, updatedReviewData));

//             if (response) {
//                 console.log(response);
//                 closeModal();
//             }
//         } catch (err) {
//             setErrors({ form: err.message || 'Failed to update review.' });
//         }
//     };

//     const handleStarClick = (starValue) => {
//         setStars(starValue);
//     };

//     return (
//         <div className='review-modal-container'>
//             <h2>Edit Your Review</h2>
//             <form className='add-review-form' onSubmit={handleSubmit}>
//                 <label>
//                     <textarea
//                         placeholder='Update your review...'
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         required
//                     />
//                     {errors.review && <span className='error'>{errors.review}</span>}
//                 </label>

//                 <label>
//                     <div className="star-rating">
//                         {[1, 2, 3, 4, 5].map((starValue) => (
//                             <span
//                                 key={starValue}
//                                 className={`star-icon ${stars >= starValue ? 'filled' : ''}`}
//                                 onClick={() => handleStarClick(starValue)} // Handle click event
//                             >
//                                 ★
//                             </span>
//                         ))}
//                     </div>
//                     {errors.stars && <span className='error'>{errors.stars}</span>}
//                 </label>

//                 {errors.form && <span className='error'>{errors.form}</span>}
//                 <div className='review-modal-btns'>
//                     <button type="submit" disabled={!isValid()}>Save Changes</button>
//                     <button type="button" onClick={closeModal}>Cancel</button>
//                 </div>
//             </form>        
//         </div>
//     );
// }

// export default UpdateReviewModal;






// const UpdateReviewModal = ({ review }) => {
//     if (!review) {
//       return <div>Error: No review data provided</div>;
//     }
  
//     const { review: reviewText = '', stars = 0, User = {} } = review;
  
//     return (
//       <div>
//         <h2>Edit Review</h2>
//         <textarea defaultValue={reviewText} />
//         <input type="number" defaultValue={stars} />
//         <p>Review by: {User.firstName || 'Anonymous'}</p>
//       </div>
//     );
// };

// export default UpdateReviewModal;





import { useState } from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReviewData = { review: reviewText, stars };

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
        setStars(starValue); // Update stars state on click
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