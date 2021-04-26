export const PUSH_ITEM_TO_STAGE = 'debot/PUSH_ITEM_TO_STAGE';
export const CLEAR_STAGE = 'debot/CLEAR_STAGE';
export const SET_SIGNING_BOX = 'debot/SET_SIGNING_BOX';
export const SET_APPROVE_WINDOW = 'debot/SET_APPROVE_WINDOW';
export const FILTER_DEBOTS_LIST_BY_NAME = 'debot/FILTER_DEBOTS_LIST_BY_NAME';
export const SET_LOCAL_DEBOTS_LIST = 'debot/SET_LOCAL_DEBOTS_LIST';

export const pushItemToStage = item => dispatch => {
	dispatch({
		type: PUSH_ITEM_TO_STAGE,
		payload: item,
	})
}

export const clearStage = () => dispatch => {
	dispatch({ type: CLEAR_STAGE });
}

export const setSigningBox = signingBoxInfo => dispatch => {
	dispatch({
		type: SET_SIGNING_BOX,
		payload: signingBoxInfo,
	})
}

export const setApproveWindow = approveWindowInfo => dispatch => {
	dispatch({
		type: SET_APPROVE_WINDOW,
		payload: approveWindowInfo,
	})
}

export const filterDebotsListByName = filterValue => dispatch => {
	dispatch({
		type: FILTER_DEBOTS_LIST_BY_NAME,
		payload: filterValue,
	})
}

export const setLocalDebotsList = debotsList => dispatch => {
	dispatch({
		type: SET_LOCAL_DEBOTS_LIST,
		payload: debotsList,
	})
}
