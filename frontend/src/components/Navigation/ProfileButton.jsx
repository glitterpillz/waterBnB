import './ProfileButton.css';
import * as sessionActions from '../../store/session';

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PiUserListBold } from "react-icons/pi";
import { useNavigate, Link } from 'react-router-dom'

import OpenModalButton from './OpenModalButton'
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';


const UserList = () => {
    return (
        <div className="user-list-button">
            <PiUserListBold />
        </div>
    );
};

function ProfileButton({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const ulRef = useRef();

    // const userSpots = useSelector((state) => state.session.userSpots);

    useEffect(() => {
        if (user) {
            dispatch(sessionActions.getUserSpots()); 
        }
    }, [dispatch, user]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate("/");
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    // const hasSpots = userSpots && userSpots.length > 0;

    return (
        <div className="profile-btn-container">
            <button onClick={toggleMenu}>
                <UserList />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>

                        <hr />

                        <li>
                        {/* {hasSpots ? ( */}
                            <Link className="manage-spots" to={"/user/spots"} onClick={closeMenu}>
                                Manage Spots
                            </Link>
                        {/* ) : (
                            <Link className="create-spot" to={"/spots/new"} onClick={closeMenu}>
                                Create a New Spot
                            </Link>
                        )} */}
                        </li>

                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;
