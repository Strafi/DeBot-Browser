export const ADD_ACCOUNT = 'account/ADD_ACCOUNT';
export const SELECT_ACCOUNT = 'account/SELECT_ACCOUNT';
export const REMOVE_ACCOUNT = 'account/REMOVE_ACCOUNT';
export const SET_ADD_ACCOUNT_MODAL = 'account/SET_ADD_ACCOUNT_MODAL';

export const addAccount = payload => ({
	type: ADD_ACCOUNT,
	payload,
})

export const selectAccount = accountAddress => ({
	type: SELECT_ACCOUNT,
	payload: accountAddress,
})

export const removeAccount = accountAddress => ({
	type: REMOVE_ACCOUNT,
	payload: accountAddress,
})

export const setAddAccountModal = payload => ({
	type: SET_ADD_ACCOUNT_MODAL,
	payload,
})
