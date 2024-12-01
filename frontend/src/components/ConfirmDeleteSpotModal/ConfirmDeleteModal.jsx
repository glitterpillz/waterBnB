import './ConfirmDeleteModal.css'

import * as sessionActions from '../../store/session';

import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function ConfirmDeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(sessionActions.deleteUserSpot(spotId))
            .then(() => {
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                console.error('Error deleting spot:', data);
            });
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <div className='confirm-delete-container'>
            <div className='confirm-delete-form'>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this spot?</p>
                <div className='confirm-delete-buttons'>
                    <button
                        className='delete-btn'
                        type='button'
                        onClick={handleDelete}
                    >
                        Yes (Delete Spot)
                    </button>
                    <button
                        className='cancel-btn'
                        type='button'
                        onClick={handleCancel}    
                    >
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteSpotModal;