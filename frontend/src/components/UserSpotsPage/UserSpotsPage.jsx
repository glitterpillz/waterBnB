import './UserSpotsPage.css'

import * as sessionActions from '../../store/session';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function UserSpotsPage() {
    const dispatch = useDispatch();

    const userSpots = useSelector((state) => {
        console.log('Redux State:', state);
        return state.session.userSpots;
    })

    useEffect(() => {
        dispatch(sessionActions.getUserSpots()); 
    }, [dispatch]);

    const handleDelete = (spotId) => {
        if (window.confirm('Are you sure you want to delete this spot?')) {
            dispatch(sessionActions.deleteUserSpot(spotId));
        }
    };

    if (!userSpots.length) {
        return <p>You have no spots yet.</p>;
    }

    return (
        <div>
            <h1>Manage Your Spots</h1>
            <button className='new-spot-btn' type='button'>Create a New Spot</button>
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
                                            <div className='spot-rating'>⭐ {spot.rating}</div>
                                        </div>
                                        <div className='spot-price'>${spot.price} night</div>
                                        <div className='user-spot-btns'>
                                            <button type='button' className='spot-update-btn'>Update</button>
                                            <button type='button' className='spot-delete-btn' onClick={() => handleDelete(spot.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>    
                        );
                    })
                ) : (
                    <div>No spots available</div>
                )}
            </div>
            {/* <ul className='user-spots'>
                {userSpots.map((spot) => (
                    <li key={spot.id}>
                        <h3>{spot.name}</h3>
                        <p>{spot.description}</p>
                        <p>{spot.city}, {spot.country}</p>
                        <p>Price: {spot.price}</p>
                        <button
                            onClick={() => handleDelete(spot.id)}
                            className='delete-btn'
                        >
                            Delete Spot
                        </button>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default UserSpotsPage;