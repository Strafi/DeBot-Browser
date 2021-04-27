import { combineReducers } from 'redux';
import debot from './debot';
import environment from './environment';

const rootReducer = combineReducers({
	debot,
	environment,
});

export default rootReducer;
