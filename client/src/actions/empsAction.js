import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getEmps = () => async (dispatch) => {
	try {
		const { data } = await api.fetchEmps();
		dispatch({ type: FETCH_ALL, payload: data });
		
	} catch (error) {
		console.log(error);
  	}
};

export const createEmp = (emp) => async (dispatch) => {
  try {
    const { data } = await api.createEmp(emp);
    dispatch({ type: CREATE, payload: data });
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

