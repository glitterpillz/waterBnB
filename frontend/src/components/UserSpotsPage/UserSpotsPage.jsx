import * as sessionActions from '../../store/session';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserSpotsPage() {
    const dispatch = useDispatch();

    const userSpots = useSelector((state) => {
        console.log('Redux State:', state);
        return state.session.userSpots;
    })

    useEffect(() => {
        dispatch(sessionActions.getUserSpots()); 
    }, [dispatch]);

    if (!userSpots.length) {
        return <p>You have no spots yet.</p>;
    }

    return (
        <div>
            <h1>Your Spots</h1>
            <ul className='user-spots'>
                {userSpots.map((spot) => (
                    <li key={spot.id}>
                        <h3>{spot.name}</h3>
                        <p>{spot.description}</p>
                        <p>{spot.city}, {spot.country}</p>
                        <p>Price: {spot.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserSpotsPage;