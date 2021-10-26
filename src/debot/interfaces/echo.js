import store from '/src/store';
import tonClientController from '/src/tonClient';
import { DEngine } from '/src/debot';
import { decodeString, encodeString } from '/src/helpers';
import { COMPONENTS_BINDINGS, DEBOT_WC } from '/src/constants';
import { pushItemToStage } from '/src/store/actions/debot';
import { ECHO_ABI } from '../ABIs';

const ID = 'f6927c0d4bdb69e1b52d27f018d156ff04152f00558042ff674f0fec32e4369d';

class Echo {
	constructor() {
		this.id = ID;
		this.abi = ECHO_ABI;
	}

	echo(params) {
		const { debotAddress } = params;
		const { answerId, request } = params.value;

		const decodedRequest = decodeString(request);
		const response = encodeString(decodedRequest);
		const interfaceAddress = `${DEBOT_WC}:${this.id}`;
		
		DEngine.callDebotFunction(debotAddress, interfaceAddress, answerId, { response })
			.catch(err => {
				console.error(err);

				const stageObject = {
					text: err.message,
					component: COMPONENTS_BINDINGS.TEXT,
					isError: true,
					interfaceAddress,
				};
				
				store.dispatch(pushItemToStage(stageObject));
			});
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
				case 'echo':
					return this.echo(extendedParams);

				default:
					throw new Error(`Function does not exist on interface: ${this.constructor.name}`);
			}
		} catch (err) {
			console.error('Interface execution failed: ', err);
		}
	}
}

export default Echo;
