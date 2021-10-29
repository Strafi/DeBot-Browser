import store from '/src/store';
import tonClientController from '/src/tonClient';
import { encodeString } from '/src/helpers';
import { DEBOT_WC } from '/src/constants';
import { USERINFO_ABI } from '../ABIs';
import { DEngine } from '/src/debot';

const ID = 'a56115147709ed3437efb89460b94a120b7fe94379c795d1ebb0435a847ee580';

class Userinfo {
	constructor() {
		this.id = ID;
		this.abi = USERINFO_ABI;
	}

	async getAccount(params) {
		const { wallet } = store.getState().account;
		const { value: { answerId }, debotAddress } = params;
		const interfaceAddress = `${DEBOT_WC}:${this.id}`;

		try {
			await DEngine.callDebotFunction(debotAddress, interfaceAddress, answerId, { value: wallet.address });
		} catch(err) {
			console.error(err.message);
		}
	}

	async getPublicKey(params) {
		const { wallet } = store.getState().account;
		const { value: { answerId }, debotAddress } = params;
		const interfaceAddress = `${DEBOT_WC}:${this.id}`;

		try {
			await DEngine.callDebotFunction(debotAddress, interfaceAddress, answerId, { value: encodeString(wallet.publicKey) });
		} catch(err) {
			console.error(err.message);
		}
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
				case 'getAccount':
					return this.getAccount(extendedParams);

				case 'getPublicKey':
					return this.getPublicKey(extendedParams);

				default:
					throw new Error(`Function does not exist on interface: ${this.constructor.name}`);
			}
		} catch (err) {
			console.error('Interface execution failed: ', err);
		}
	}
}

export default Userinfo;
