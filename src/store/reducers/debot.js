import {
	PUSH_ITEM_TO_STAGE,
	CLEAR_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
} from '../actions/debot';

const initialState = {
	stage: [],
	signingBox: null,
	approveWindow: null,
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

		default:
			return state
	}
}

export default reducer
