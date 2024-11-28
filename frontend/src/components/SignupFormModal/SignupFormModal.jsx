import './SignupForm.css'
import * as sessionActions from '../../store/session';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function SignupFormModal() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const isValid = () => {
        return (
            email.trim() &&
            username.trim() &&
            firstName.trim() &&
            lastName.trim() &&
            password.trim() &&
            confirmPassword.trim() &&
            username.length >= 4 &&
            password.length >= 6
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!isValid()) {
            setErrors({
                username: username.length < 4 ? 'Username must be at least 4 characters long' : '',
                password: password.length < 6 ? 'Password must be at least 6 characters long' : '',
            });
            return;
        }

        if (isValid() && password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password
                })
            ).then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                
                if (data?.errors) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        ...data.errors,
                    }));
                }
            });
        }
        return setErrors({
            email: 'The provided email is invalid',
            username: 'Username must be unique',
            confirmPassword: 'Passwords must match',
        });
    };

    return (
        <div id='signup-form-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label>
                    Email
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Username
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label>
                    First Name
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
                <label>
                    Last Name
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <div className='submit-btn'>
                    <button type='submit' disabled={!isValid()}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormModal;