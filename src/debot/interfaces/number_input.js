import store from 'src/store';
import tonClient from 'src/tonClient';
import { decodeString } from 'src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from 'src/constants';
import { pushItemToStage } from 'src/store/actions/debot';
import { NUMBER_INPUT_ABI } from '../ABIs';

const ID = 'c5a9558b2664aed7dc3e6123436d544f13ffe69ab0e259412f48c6d1c8588401';

class NumberInput {
	constructor() {
		this.id = ID;
		this.abi = NUMBER_INPUT_ABI;
	}

	get(params) {
		const { answerId, prompt, ...config } = params.value;

		const decodedPrompt = decodeString(prompt);
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			config,
			component: COMPONENTS_BINDINGS.AMOUNT_INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
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

				default:
					throw new Error(`Function does not exist on interface: ${this.constructor.name}`);
			}
		} catch (err) {
			console.error('Interface execution failed: ', err);
		}
	}
}

export default NumberInput;
