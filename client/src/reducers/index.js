import { combineReducers } from 'redux';

import emps from './empsReducer';
import auth from './authReducer'

export const reducers = combineReducers({ emps, auth });