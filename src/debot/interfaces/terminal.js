import store from '/src/store';
import tonClientController from '/src/tonClient';
import { decodeString } from '/src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from '/src/constants';
import { pushItemToStage } from '/src/store/actions/debot';
import { TERMINAL_ABI } from '../ABIs';

const ID = '8796536366ee21852db56dccb60bc564598b618c865fc50c8b1ab740bba128e3';

class Terminal {
	constructor() {
		this.id = ID;
		this.abi = TERMINAL_ABI;
	}

	inputStr(params) {
		const { answerId, multiline, prompt } = params.value;

		const decodedPrompt = decodeString(prompt);
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			component: multiline ? COMPONENTS_BINDINGS.TEXTAREA : COMPONENTS_BINDINGS.INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	inputInt(params) {
		const { answerId, prompt } = params.value;

		const decodedPrompt = decodeString(prompt);
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			component: COMPONENTS_BINDINGS.AMOUNT_INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	inputTons(params) {
		const { answerId, prompt } = params.value;

		const decodedPrompt = decodeString(prompt);
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			config: {
				min: '0',
				decimals: '9',
			},
			component: COMPONENTS_BINDINGS.TOKENS_INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	inputBoolean(params) {
		const { answerId, prompt } = params.value;

		const decodedPrompt = decodeString(prompt);
		const stageObject = {
			text: decodedPrompt,
			functionId: answerId,
			component: COMPONENTS_BINDINGS.CONFIRM_INPUT,
			interfaceAddress: `${DEBOT_WC}:${this.id}`,
		};
		
		store.dispatch(pushItemToStage(stageObject));
	}

	print(params) {
		const { answerId, message } = params.value;

		const decodedMessage = decodeString(message);
		const stageObject = {
			text: decodedMessage,
			functionId: answerId,
			component: COMPONENTS_BINDINGS.TEXT,
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
				case 'input':
					return this.inputStr(extendedParams);

				case 'inputStr':
					return this.inputStr(extendedParams);
				
				case 'inputInt':
					return this.inputInt(extendedParams);

				case 'inputUint':
					return this.inputInt(extendedParams);

				case 'inputTons':
					return this.inputTons(extendedParams);

				case 'inputBoolean':
					return this.inputBoolean(extendedParams);

				case 'print':
					return this.print(extendedParams);

				default:
					throw new Error(`Function does not exist on interface: ${this.constructor.name}`);
			}
		} catch (err) {
			console.error('Interface execution failed: ', err);
		}
	}
}

export default Terminal;
