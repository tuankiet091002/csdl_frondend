import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  	try {
    	const base = await api.login(formData);
		console.log(base)
		const {data} = base;
    	dispatch({ type: AUTH, data });

    	router('/');
  	} catch (error) {
    	console.log(error);
  	}
};

export const register = (formData, router) => async (dispatch) => {
  	try {
    	const { data } = await api.register(formData);
    	dispatch({ type: AUTH, data });
		
    	router('/');
  	} catch (error) {
    	console.log(error);
  	}
};

export const logout = (router) => async (dispatch) => {
	try {
	  	const {data} = await api.logout();
	  	dispatch({ type: LOGOUT, data });

	  	router('/');
	} catch (error) {
	  console.log(error);
	}
};