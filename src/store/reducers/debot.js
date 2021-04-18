import {
	PUSH_ITEM_TO_STAGE,
} from '../actions/debot';

const initialState = {
	stages: [],
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

		default:
			return state
	}
}

export default reducer
