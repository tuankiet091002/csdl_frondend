import { FETCH_ALL, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getEmps = () => async (dispatch) => {
	try {
		const { data } = await api.fetchEmps();
        console.log('dsada',data)
		dispatch({ type: FETCH_ALL, payload: data });
		
	} catch (error) {
		console.log(error);
  	}
};

export const deleteEmp = (id) => async (dispatch) => {
	try {
		await api.deleteEmp(id);
		dispatch({ type: DELETE, payload: id });
		
	} catch (error) {
		console.log(error.message);
	}
};

export const getEmpsBySearch = (searchQuery) => async (dispatch) => {
	try {
		const { data : data } = await api.fetchEmpsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
	} catch (error) {
	  	console.log(error);
	}
  };