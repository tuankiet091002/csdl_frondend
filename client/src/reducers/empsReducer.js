import { FETCH_ALL, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes';

export default (emps = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload.users;
		case DELETE:
			return emps.filter((emp) => emp._id !== action.payload);
		case FETCH_BY_SEARCH:
			return action.payload.users;
		default:
			return emps;
	}
};