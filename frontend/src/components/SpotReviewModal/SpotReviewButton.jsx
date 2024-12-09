import OpenModalButton from '../Navigation/OpenModalButton';
import ReviewFormModal from './SpotReviewModal';

const SpotReviewButton = ({ spot, onNewReview }) => {
    return (
        <OpenModalButton
            modalComponent={<ReviewFormModal spot={spot} onNewReview={onNewReview} />}
            buttonText="Post Your Review"
            className="post-review-button"
        />
    );
};

export default SpotReviewButton;