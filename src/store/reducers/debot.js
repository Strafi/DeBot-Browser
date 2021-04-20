import {
	PUSH_ITEM_TO_STAGE,
	SET_SIGNING_BOX,
	SET_APPROVE_WINDOW,
} from '../actions/debot';

const initialState = {
	stages: [],
	signingBox: null,
	approveWindow: null,
}
  
function reducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case PUSH_ITEM_TO_STAGE: {
			const stages = [...state.stages];

			if (!stages.length) {
				stages.push([payload]);
			} else {
				stages[stages.length - 1].push(payload);
			}

			return {
				...state,
				stages,
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
