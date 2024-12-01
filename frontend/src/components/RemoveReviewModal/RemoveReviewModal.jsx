import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

function RemoveReviewModal({ reviewId, onDelete }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(sessionActions.removeReview(reviewId))
      .then(() => {
        onDelete(reviewId);
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        console.error('Error deleting review:', data);
      });
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className='confirm-delete-container'>
      <div className='confirm-delete-form'>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <div className='confirm-delete-buttons'>
          <button className='delete-btn' type='button' onClick={handleDelete}>
            Yes (Delete Review)
          </button>
          <button className='cancel-btn' type='button' onClick={handleCancel}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveReviewModal;