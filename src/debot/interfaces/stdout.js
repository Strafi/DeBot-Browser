import store from 'src/store';
import tonClient from 'src/tonClient';
import { decodeString } from 'src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from 'src/constants';
import { pushItemToStage } from 'src/store/actions/debot';
import { STDOUT_ABI } from '../ABIs';

const ID = 'c91dcc3fddb30485a3a07eb7c1e5e2aceaf75f4bc2678111de1f25291cdda80b';

class Stdout {
	constructor() {
		this.id = ID;
		this.abi = STDOUT_ABI;
	}

	print(params) {
		const { message } = params.value;

		const decodedMessage = decodeString(message);
		const stageObject = {
			text: decodedMessage,
			component: COMPONENTS_BINDINGS.STDOUT,
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

export default Stdout;
