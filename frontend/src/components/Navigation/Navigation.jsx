import './Navigation.css';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineWaterDrop } from "react-icons/md";

import ProfileButton from './ProfileButton';

// const WaterDrop = () => {
//     return (
//         <div style={{ color: 'white', fontSize:'50px', marginTop: '10px'}}>
//             <MdOutlineWaterDrop />
//         </div>
//     );
// };

const WaterDrop = () => {
    return (
        <div className="water-drop">
            <MdOutlineWaterDrop />
        </div>
    );
};


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul className='nav-bar'>
            <li>
                <NavLink to='/' className='home-btn'>
                    <span className='home-container'><WaterDrop /> WaterBnB</span>
                </NavLink>
            </li>
            {sessionUser && (
                <li className='create-profile-group'>
                    <NavLink to='/spots/new' className='create-spot-btn'>
                        Create a New Spot
                    </NavLink>
                    <ProfileButton className='profile-btn' user={sessionUser} />
                </li>
            )}
            {isLoaded && !sessionUser && (
                <li>
                    <ProfileButton className='profile-btn' user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;