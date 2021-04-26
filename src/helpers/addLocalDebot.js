import store from 'src/store';
import { setLocalDebotsList } from 'src/store/actions/debot';
import { USER_DEBOTS_LS_FIELD } from 'src/constants';

function addLocalDebot(debotLabel, debotAddress) {
	const localDebosFromLS = JSON.parse(localStorage.getItem(USER_DEBOTS_LS_FIELD)) || [];

	const debotObj = {
		label: debotLabel,
		address: debotAddress,
	}

	const newLocalDebots = [debotObj, ...localDebosFromLS];

	store.dispatch(setLocalDebotsList(newLocalDebots));
	localStorage.setItem(USER_DEBOTS_LS_FIELD, JSON.stringify(newLocalDebots));
}

export default addLocalDebot;
