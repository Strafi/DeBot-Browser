export const SET_ENVIRONMENT_VARIABLE = 'debot/ADD_ENVIRONMENT_VARIABLES';

export const setEnvironmentVariables = variables => dispatch => {
	dispatch({
		type: SET_ENVIRONMENT_VARIABLE,
		payload: variables,
	})
}
