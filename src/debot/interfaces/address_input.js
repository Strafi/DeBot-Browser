import store from 'src/store';
import tonClient from 'src/tonClient';
import { decodeString } from 'src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from 'src/constants';
import { pushItemToStage } from 'src/store/actions/debot';
import { ADDRESS_INPUT_ABI } from '../ABIs';

const ID = 'd7ed1bd8e6230871116f4522e58df0a93c5520c56f4ade23ef3d8919a984653b';

class AddressInput {
	constructor() {
		this.id = ID;
		this.abi = ADDRESS_INPUT_ABI;
	}

	get(params) {
		const { answerId, prompt } = params.value;

		const decodedPrompt = prompt ? decodeString(prompt) : '';
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			component: COMPONENTS_BINDINGS.ADDRESS_INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	select(params) {
		return this.get(params);
	}

	async call(params) {
		try {
			const decodedMessage = await tonClient.abi.decode_message({
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
				case 'get':
					return this.get(extendedParams);

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

export default AddressInput;
