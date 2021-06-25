import store from 'src/store';
import tonClientController from 'src/tonClient';
import { encodeString } from 'src/helpers';
import { DEBOT_WC } from 'src/constants';
import { setAddAccountModal } from 'src/store/actions/account';
import { USERINFO_ABI } from '../ABIs';
import { DEngine } from 'src/debot';

const ID = 'a56115147709ed3437efb89460b94a120b7fe94379c795d1ebb0435a847ee580';

class Userinfo {
	constructor() {
		this.id = ID;
		this.abi = USERINFO_ABI;
	}

	_getAccountData(debotAddress, interfaceAddress, answerId, isPubkey) {
		const { accountsList, chosenAccountAddress } = store.getState().account;

		if (!accountsList?.length) {
			setAddAccountModal({
				isVisible: true,
				debotAddress,
				functionId: answerId,
				interfaceAddress,
				isPubkey,
			});

			return null;
		}

		const chosenAccount = accountsList.find(account => account.address === chosenAccountAddress) || accountsList[0];

		return chosenAccount;
	} 

	async getAccount(params) {
		const { value: { answerId }, debotAddress } = params;
		const interfaceAddress = `${DEBOT_WC}:${this.id}`;
		const accountData = this._getAccountData(debotAddress, interfaceAddress, answerId);

		if (accountData) {
			try {
				await DEngine.callDebotFunction(debotAddress, interfaceAddress, answerId, { value: accountData.address });
			} catch(err) {
				console.error(err.message);
			}
		}
	}

	async getPublicKey(params) {
		const { value: { answerId }, debotAddress } = params;
		const interfaceAddress = `${DEBOT_WC}:${this.id}`;
		const accountData = this._getAccountData(debotAddress, interfaceAddress, answerId, true);

		if (accountData) {
			try {
				await DEngine.callDebotFunction(debotAddress, interfaceAddress, answerId, { value: encodeString(accountData.pubkey) });
			} catch(err) {
				console.error(err.message);
			}
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
