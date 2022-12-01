import { DELETE, FETCH_BY_SEARCH, FETCH_ALL, CREATE} from '../constants/actionTypes';

export default (state = {trns: []}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, trns: action.payload.trainees};
		case DELETE:
			return {...state, trns: state.trns.filter((trn) => trn._id !== action.payload)};
		case FETCH_BY_SEARCH:
			return {...state, trns: action.payload.trainees};
        case CREATE:
            return {...state, trns: [...state.trns, action.payload.trn]};
		default:
			return state;
	}
};