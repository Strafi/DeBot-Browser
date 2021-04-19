export const PUSH_ITEM_TO_STAGE = 'contest/PUSH_ITEM_TO_STAGE';
export const SET_SIGNING_BOX = 'contest/SET_SIGNING_BOX';

export const pushItemToStage = item => dispatch => {
	dispatch({
		type: PUSH_ITEM_TO_STAGE,
		payload: item,
	})
}

export const setSigningBox = signingBoxInfo => dispatch => {
	dispatch({
		type: SET_SIGNING_BOX,
		payload: signingBoxInfo,
	})
}
