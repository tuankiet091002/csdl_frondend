import { DELETE, FETCH_BY_SEARCH, FETCH_ALL, FETCH_BY_ID, CREATE} from '../constants/actionTypes';

export default (state = {trns: [], strn: null}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, trns: action.payload.trainees};
		case FETCH_BY_SEARCH:
			return {...state, trns: action.payload.trainees};
        case FETCH_BY_ID:
            return {...state, strn: action.payload};
        case CREATE:
            return {...state, trns: [...state.trns, action.payload.trainee]};
        case DELETE:
			return {...state, trns: state.trns.filter((trn) => trn._id !== action.payload)};
		default:
			return state;
	}
};