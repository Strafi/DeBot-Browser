import {
	PUSH_ITEM_TO_STAGE,
	CLEAR_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
	SET_DEBOTS_FILTER_KEY,
	SET_LOCAL_DEBOTS_LIST,
} from '../actions/debot';
import { USER_DEBOTS_LS_FIELD, MAIN_NETWORK } from '/src/constants';

const initialState = {
	stage: [],
	signingBox: null,
	approveWindow: null,
	filterKey: '',
	debotsList: [
		{ title: 'DeNS', address: '0:c22300f9851e4fc9c246c3b605c521415407d95b272f0624a5e8f0d01ef25f27', network: MAIN_NETWORK },
	],
	localDebotsList: JSON.parse(localStorage.getItem(USER_DEBOTS_LS_FIELD)) || [],
}
  
function reducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case PUSH_ITEM_TO_STAGE: {
			const stage = [...state.stage, payload];

			return {
				...state,
				stage,
			}
		}

		case CLEAR_STAGE: {
			return {
				...state,
				stage: [],
			}
		}

		case SET_SIGNING_BOX: {
			return {
				...state,
				signingBox: payload,
			}
		}

		case SET_APPROVE_WINDOW: {
			return {
				...state,
				approveWindow: payload,
			}
		}

		case SET_DEBOTS_FILTER_KEY: {
			const filterKey = payload.toLowerCase();

			return {
				...state,
				filterKey,
			}
		}

		case SET_LOCAL_DEBOTS_LIST: {
			return {
				...state,
				localDebotsList: payload,
			}
		}

		default:
			return state
	}
}

export default reducer
