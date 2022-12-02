import { FETCH_ALL, DELETE, FETCH_BY_SEARCH, CREATE, FETCH_BY_ID } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTrainees = () => async (dispatch) => {
	try {
		const { data } = await api.fetchTrns();
		dispatch({ type: FETCH_ALL, payload: data });
		
	} catch (error) {
		console.log(error);
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

export const getTrnById = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchTrnById(id);
        console.log(data)
        dispatch({type: FETCH_BY_ID, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const createTrainee = (formData) => async (dispatch) => {
	try {
		const { data } = await api.createTrn(formData);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
	  	console.log(error);
	}
};
