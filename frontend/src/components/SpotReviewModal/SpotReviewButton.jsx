import OpenModalButton from '../Navigation/OpenModalButton';
import ReviewFormModal from './SpotReviewModal';

const SpotReviewButton = ({ spot }) => {
    return (
        <OpenModalButton
            modalComponent={<ReviewFormModal spot={spot} />}
            buttonText='Post Your Review'
        />
    );
};

export default SpotReviewButton;