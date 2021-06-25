import {
	ADD_ACCOUNT,
	SELECT_ACCOUNT,
	REMOVE_ACCOUNT,
	SET_ADD_ACCOUNT_MODAL,
} from '../actions/account';
import { ACCOUNTS_LIST_LS_FIELD, CHOSEN_ACCOUNT_LS_FIELD } from 'src/constants';
import { generateRandomColor } from 'src/helpers';

const initialState = {
	addAccountModal: null,
	chosenAccountAddress: localStorage.getItem(CHOSEN_ACCOUNT_LS_FIELD) || null,
	accountsList: JSON.parse(localStorage.getItem(ACCOUNTS_LIST_LS_FIELD)) || [],
}
  
function reducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_ACCOUNT: {
			const color = generateRandomColor();
			const accountData = {
				...payload,
				color: `#${color}`,
			}
			const accountsList = [...state.accountsList, accountData];
			const chosenAccountAddress = payload.address;

			localStorage.setItem(ACCOUNTS_LIST_LS_FIELD, JSON.stringify(accountsList));
			localStorage.setItem(CHOSEN_ACCOUNT_LS_FIELD, chosenAccountAddress);

			return {
				...state,
				accountsList,
				chosenAccountAddress,
			}
		}

		case SELECT_ACCOUNT: {
			localStorage.setItem(CHOSEN_ACCOUNT_LS_FIELD, payload);

			return {
				...state,
				chosenAccountAddress: payload,
			}
		}

		case REMOVE_ACCOUNT: {
			const accountsList = state.accountsList.filter(account => account.address !== payload);
			const isDeletingActiveAccount = state.chosenAccountAddress === payload;
			const chosenAccountAddress = isDeletingActiveAccount ? accountsList[0] : state.chosenAccountAddress;

			localStorage.setItem(ACCOUNTS_LIST_LS_FIELD, JSON.stringify(accountsList));
			localStorage.setItem(CHOSEN_ACCOUNT_LS_FIELD, chosenAccountAddress);

			return {
				...state,
				accountsList,
				chosenAccountAddress,
			}
		}

		case SET_ADD_ACCOUNT_MODAL: {
			return {
				...state,
				addAccountModal: payload,
			}
		}

		default:
			return state
	}
}

export default reducer
