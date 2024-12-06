import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SIGNUP_USER = 'users/signupUser';
const GET_USER_SPOTS = 'session/getUserSpots';
const CREATE_USER_SPOT = 'session/createUserSpot'
const DELETE_USER_SPOT = 'session/deleteSpot'
const UPDATE_USER_SPOT = 'session/updateSpot'
const GET_USER_REVIEWS = 'session/getUserReviews'
const ADD_REVIEW = 'session/addReview';
const DELETE_REVIEW = 'session/deleteReview';
const UPDATE_REVIEW = 'session/updateReview';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const setUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    };
};

const addUserSpot = (spot) => {
    return {
        type: CREATE_USER_SPOT,
        payload: spot
    };
};

const deleteSpot = (spotId) => {
    return {
        type: DELETE_USER_SPOT,
        payload: spotId
    };
};

const updateSpot = (spot) => {
    return {
        type: UPDATE_USER_SPOT,
        payload: spot
    };
};

const setUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews
    }
}


const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    };
};

const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        payload: review
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    dispatch(getUserReviews());
    return response;
};


export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;    
}


export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
}

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/spots');
    const data = await response.json();
    if (data.Spots) {
        dispatch(setUserSpots(data.Spots));
    }
    return response;
}

export const createUserSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots/', {
        method: 'POST',
        body: JSON.stringify(spotData)
    });
    const data = await response.json();
    console.log(data)
    if (data.Spot) {
        dispatch(addUserSpot(data.Spot))
    }
    return response
}

export const deleteUserSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }

    return response;
}

export const editUserSpot = (spotId, updatedSpotData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedSpotData),
    });

    if (response.ok) {
        const data = response.json();
        dispatch(updateSpot(data.Spot));
    }

    return response;
}

export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/reviews');
    const data = await response.json();

    if (data.reviews) {
        dispatch(setUserReviews(data.review));
    }

    return response;
}

export const createReview = (spotId, reviewData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${spotId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(addReview(data.review));
            return data.review;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create review');
        }
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const removeReview = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteReview({ reviewId, spotId }))
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
    }

    return response;
};

export const editReview = (reviewId, updatedReviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedReviewData),
    });

    if (response.ok) {
        const data = response.json();
        dispatch(updateReview(data.Review));
    }

    return response;
};

const initialState = { 
    user: null, 
    userSpots: [],
    userReviews: []
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case SIGNUP_USER:
            return { ...state, user: action.payload };
        case GET_USER_SPOTS:
            return { ...state, userSpots: action.payload };
        case CREATE_USER_SPOT:
            return {
                ...state,
                userSpots: [...state.userSpots, action.payload]
            };
        case DELETE_USER_SPOT:
            return {
                ...state,
                userSpots: state.userSpots.filter(spot => spot.id !== action.payload)
            };
        case UPDATE_USER_SPOT:
            return {
                ...state,
                userSpots: state.userSpots.map((spot) =>
                  action.payload && spot.id === action.payload.id ? action.payload : spot
                ),
            };
        case GET_USER_REVIEWS:
            return { ...state, userReviews: action.payload }
        case ADD_REVIEW:   
            return {
                ...state,
                userSpots: state.userSpots.map((spot) =>
                    spot.id === action.payload.spotId
                        ? {
                            ...spot,
                            Reviews: [...(spot.Reviews || []), action.payload],
                        }
                        : spot
                ),
                userReviews: [...state.userReviews, action.payload]
            };
        case DELETE_REVIEW:
            return {
                ...state,
                userSpots: state.userSpots.map((spot) =>
                    spot.id === action.payload.spotId
                        ? {
                            ...spot,
                            Reviews: spot.Reviews.filter((review) => review.id !== action.payload.reviewId),
                        }
                        : spot
                ),
                userReviews: state.userReviews.filter((review) => review.id !== action.payload.reviewId),
            };
        case UPDATE_REVIEW:
            return {
                ...state,
                userReviews: state.userReviews.map((review) =>
                action.payload && review.id === action.payload.id ? action.payload : review
                ),
            };
        default:
            return state;
    }
};


export default sessionReducer;

