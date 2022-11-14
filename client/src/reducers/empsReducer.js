import { FETCH_ALL, CREATE, DELETE} from '../constants/actionTypes';

export default (emps = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATE:
			return [...emps, action.payload];
		case DELETE:
			return emps.filter((emp) => emp._id !== action.payload);
		default:
			return emps;
	}
};