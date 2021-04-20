import {
	PUSH_ITEM_TO_STAGE,
	CLEAR_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
	FILTER_DEBOTS_LIST_BY_NAME,
} from '../actions/debot';

const initialState = {
	stage: [],
	signingBox: null,
	approveWindow: null,
	debotsList: [
		{ title: 'TIP-3 DeBot', address: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317' },
		{ title: 'SMV DeBot', address: '0:704c8d64aed3c79e84ab1a8fc7076de287aa8ddbb967687ce1342d71bd73ff32' },
	],
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

		case FILTER_DEBOTS_LIST_BY_NAME: {
			const searchKey = payload.toLowerCase();
			const debotsList = initialState.debotsList.filter(debot => debot.title.toLowerCase().startsWith(searchKey));

			return {
				...state,
				debotsList,
			}
		}

		default:
			return state
	}
}

export default reducer
