import store from '/src/store';
import tonClientController from '/src/tonClient';
import { decodeString } from '/src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from '/src/constants';
import { pushItemToStage } from '/src/store/actions/debot';
import { MENU_ABI } from '../ABIs';

const ID = 'ac1a4d3ecea232e49783df4a23a81823cdca3205dc58cd20c4db259c25605b48';

class Menu {
	constructor() {
		this.id = ID;
		this.abi = MENU_ABI;
	}

	select(params) {
		const { description, title, items } = params.value;

		const decodedTitle = decodeString(title);
		const decodedDescription = decodeString(description);
		const menuItems = items.map(item => ({
			functionId: item.handlerId,
			title: decodeString(item.title),
			description: decodeString(item.description),
		}));

		const stageObject = {
			title: decodedTitle,
			text: decodedDescription,
			menuItems,
			component: COMPONENTS_BINDINGS.MENU,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	async call(params) {
		try {
			const decodedMessage = await tonClientController.client.abi.decode_message({
				abi: {
					type: 'Contract',
					value: this.abi,
				},
				message: params.message,
			});

			const extendedParams = {
				...params,
				...decodedMessage,
			}

			switch(decodedMessage.name) {
				case 'select':
					return this.select(extendedParams);

				default:
					throw new Error(`Function does not exist on interface: ${this.constructor.name}`);
			}
		} catch (err) {
			console.error('Interface execution failed: ', err);
		}
	}
}

export default Menu;
