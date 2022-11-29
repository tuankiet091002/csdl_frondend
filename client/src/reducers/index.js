import { combineReducers } from 'redux';

import emps from './empsReducer.js';
import auth from './authReducer.js';

export const reducers = combineReducers({ emps, auth });