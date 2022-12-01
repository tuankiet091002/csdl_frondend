import { combineReducers } from 'redux';

import trns from './trnsReducer.js';
import auth from './authReducer.js';

export const reducers = combineReducers({ trns, auth });