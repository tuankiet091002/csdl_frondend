import {AUTH, LOGOUT } from '../constants/actionTypes';

export default  (state = { auth: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({...action?.payload.user}));
			return {...state, auth: action.payload.user}
		case LOGOUT:
			localStorage.clear();
			return { ...state, auth: null};
		default:
			return state;
	}
};
