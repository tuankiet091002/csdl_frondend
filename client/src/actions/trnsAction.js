import { FETCH_ALL, DELETE, FETCH_BY_SEARCH, CREATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTrainees = () => async (dispatch) => {
	try {
		const { data } = await api.fetchTrns();
		dispatch({ type: FETCH_ALL, payload: data });
		
	} catch (error) {
		console.log(error);
  	}
};

export const deleteTrn = (id) => async (dispatch) => {
	try {
		await api.deleteEmp(id);
		dispatch({ type: DELETE, payload: id });
		
	} catch (error) {
		console.log(error.message);
	}
};

export const getTrnsBySearch = (searchQuery) => async (dispatch) => {
	try {
		const { data } = await api.fetchTrnsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
	} catch (error) {
	  	console.log(error);
	}
};

export const createTrainee = (formData) => async (dispatch) => {
	try {
		const { data } = await api.createTrn(formData);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
	  	console.log(error);
	}
};