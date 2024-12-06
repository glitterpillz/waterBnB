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
    
        const validationErrors = {};
    
        if (!validateEmail(email)) {
            validationErrors.email = 'Email is invalid';
        }
    
        if (username.length < 4) {
            validationErrors.username = 'Username must be at least 4 characters long';
        }
    
        if (password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }
    
        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords must match';
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        return dispatch(
            sessionActions.signup({
                email,
                username,
                firstName,
                lastName,
                password
            })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
    
            if (data?.errors) {
                const errorData = data.errors;
    
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    ...errorData,
                }));
            }
        });
    };
    

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };
    

    return (
        <div className='signup-form-container'>
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