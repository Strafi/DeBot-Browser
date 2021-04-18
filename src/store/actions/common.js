export const SET_IS_TUTORIAL_ACTIVE = 'common/SET_IS_TUTORIAL_ACTIVE';

export const setIsTutorialActive = isActive => dispatch => {
	dispatch({
		type: SET_IS_TUTORIAL_ACTIVE,
		payload: isActive,
	})
}
