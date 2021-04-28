import {
	PUSH_ITEM_TO_STAGE,
	CLEAR_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
	SET_DEBOTS_FILTER_KEY,
	SET_LOCAL_DEBOTS_LIST,
} from '../actions/debot';
import { USER_DEBOTS_LS_FIELD, DEV_NETWORK } from 'src/constants';

const initialState = {
	stage: [],
	signingBox: null,
	approveWindow: null,
	filterKey: '',
	debotsList: [
		{ title: 'TIP-3 DeBot', address: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317', network: DEV_NETWORK },
		{ title: 'SMV DeBot (RSquad)', address: '0:2a92e3d01c530697a0ec3ab5c3494474faa7ea0af5fa30d4ed508115bc9957a7', network: DEV_NETWORK },
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
