import {
	SET_IS_TUTORIAL_ACTIVE,
} from '../actions/common';

const initialState = {
	isTutorialActive: false,
}
  
function commonReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_IS_TUTORIAL_ACTIVE: {
			return {
				...state,
				isTutorialActive: payload,
			}
		}

		default:
			return state
	}
}

export default commonReducer
