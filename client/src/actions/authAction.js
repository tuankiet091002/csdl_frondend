import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  	try {
    	const a = await api.login(formData);
    	dispatch({ type: AUTH, payload: a.data });
    	router('/');
  	} catch (error) {
        return Promise.reject(error)
  	}
};

export const logout = (router) => async (dispatch) => {
	try {
	  	const {data} = await api.logout();
	  	dispatch({ type: LOGOUT, payload: data });
	  	router('/');
	} catch (error) {
	  console.log(error);
	}
};