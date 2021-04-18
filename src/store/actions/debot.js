export const PUSH_ITEM_TO_STAGE = 'contest/PUSH_ITEM_TO_STAGE';

export const pushItemToStage = item => dispatch => {
	dispatch({
		type: PUSH_ITEM_TO_STAGE,
		payload: item
	})
}
