import { DELETE, FETCH_BY_SEARCH, FETCH_ALL} from '../constants/actionTypes';

export default (state = {emps: []}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, emps: action.payload.trainees};
		case DELETE:
			return {...state, emps: state.emps.filter((emp) => emp._id !== action.payload)};
		case FETCH_BY_SEARCH:
			return {...state, emps: action.payload.trainees};
		default:
			return state;
	}
};