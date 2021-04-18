import { combineReducers } from 'redux';
import debot from './debot';
import common from './common';

const rootReducer = combineReducers({
	debot,
	common
});

export default rootReducer;
