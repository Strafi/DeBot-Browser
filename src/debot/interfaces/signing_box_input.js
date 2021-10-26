import store from '/src/store';
import tonClientController from '/src/tonClient';
import { decodeString } from '/src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from '/src/constants';
import { pushItemToStage } from '/src/store/actions/debot';
import { SIGNING_BOX_INPUT_ABI } from '../ABIs';

const ID = 'c13024e101c95e71afb1f5fa6d72f633d51e721de0320d73dfd6121a54e4d40a';

class SigningBoxInput {
	constructor() {
		this.id = ID;
		this.abi = SIGNING_BOX_INPUT_ABI;
	}

	get(params) {
		throw new Error ('Not implemented');
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

export default SigningBoxInput;
