import './UserSpotsPage.css'

import * as sessionActions from '../../store/session';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDeleteSpotModal from '../ConfirmDeleteSpotModal/ConfirmDeleteModal';
import { useModal } from '../../context/Modal';

function UserSpotsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const userSpots = useSelector((state) => {
        return state.session.userSpots;
    })

    useEffect(() => {
        dispatch(sessionActions.getUserSpots()); 
    }, [dispatch]);

    const handleDelete = (spotId) => {
        setModalContent(<ConfirmDeleteSpotModal spotId={spotId} />);
    }


    const handleUpdate = (spotId) => {
        navigate(`/user/spots/${spotId}/edit`)
    }

    if (!userSpots.length) {
        return (
            <div className='user-spots-container'>
                <h1>Manage Your Spots</h1>
                <h2>Bro has no spots 😔</h2>
                <button 
                    className='new-spot-btn' 
                    type='button'
                    onClick={() => navigate('/spots/new')}
                >
                    Create a New Spot
                </button>
            </div>
        )
    }

    return (
        <div className='user-spots-container'>
            <h1>Manage Your Spots</h1>
            <button 
                className='new-spot-btn' 
                type='button'
                onClick={() => navigate('/spots/new')}
            >
                Create a New Spot
            </button>
            <div className='spots-container'>
                {userSpots.length > 0 ? (
                    userSpots.map((spot) => {
                        return (
                            <div
                                key={spot.id}
                                className='spot-card'
                                title={spot.name}
                            >
                                <Link to={`/spots/${spot.id}`}>
                                    <img src={spot.previewImage} alt={spot.name} className='spot-image' />
                                    <div className='spot-details'>
                                        <div className='spot-top'>
                                            <div className='spot-location'>
                                                {spot.city}, {spot.state}
                                            </div>
                                            <div className='spot-rating'>⭐ {(spot.avgRating > 0) ? spot.avgRating : 'New'}</div>
                                        </div>
                                        <div className='spot-price'>${spot.price} night</div>
                                    </div>
                                </Link>
                                <div className='user-spot-btns'>
                                    <button 
                                        type='button' 
                                        className='spot-update-btn'
                                        onClick={() => handleUpdate(spot.id)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        type='button' 
                                        className='spot-delete-btn' 
                                        onClick={() => handleDelete(spot.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>    
                        );
                    })
                ) : (
                    <div>No spots available</div>
                )}
            </div>
        </div>
    );
}

export default UserSpotsPage;