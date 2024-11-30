import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SIGNUP_USER = 'users/signupUser';
const GET_USER_SPOTS = 'session/getUserSpots';
const CREATE_USER_SPOT = 'session/createUserSpot'
const DELETE_USER_SPOT = 'session/deleteSpot'
const UPDATE_USER_SPOT = 'session/updateSpot'


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
    }
}



export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
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
    console.log('Fetched spots:', data.Spots);
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

const initialState = { 
    user: null, 
    userSpots: []
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
            console.log('Reducer received spots:', action.payload)
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
        default:
            return state;
    }
};


export default sessionReducer;

