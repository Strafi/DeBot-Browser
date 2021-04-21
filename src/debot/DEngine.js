import store from 'src/store';
import { DebotModule } from '@tonclient/core';
import tonClient from 'src/tonClient';
import { formDebotFunctionFromId } from 'src/helpers';
import { COMPONENTS_BINDINGS } from 'src/constants';
import { pushItemToStage } from 'src/store/actions/debot';
import DebotBrowser from './DebotBrowser';

class DEngine {
	constructor() {
		this.debotModule = new DebotModule(tonClient);
		this.storage = new Map();
	}

	async runDebot(address) {
		const debotBrowser = new DebotBrowser();

		const initParams = await this.debotModule.init({ address }, debotBrowser);

		debotBrowser.setDebotParams(initParams);
		this.storage.set(address, initParams);

		const { debot_handle } = initParams;

		return this.debotModule.start({ debot_handle });
	}

	async callDebotFunction(debotAddress, interfaceAddress, functionId, input) {
		const debotParams = this.storage.get(debotAddress);
		const { debot_handle, debot_abi } = debotParams;
		const functionName = formDebotFunctionFromId(functionId);

		const call_set = {
			function_name: functionName,
		}

		if (input) {
			call_set.input = input;
		}

		const encodedMessage = await tonClient.abi.encode_internal_message({
			abi: {
				type: 'Json',
				value: debot_abi,
			},
			address: debotAddress,
			src_address: interfaceAddress,
			call_set,
			value: '1000000000000000',
		});

		try {
			const sendRes = await this.debotModule.send({ debot_handle, message: encodedMessage.message });

			return sendRes;
		} catch(err) {
			console.log(err);

			store.dispatch(pushItemToStage({
				text: err.message,
				component: COMPONENTS_BINDINGS.TEXT,
				isError: true,
			}));
		}
	}
}

const dEngine = new DEngine();

export default dEngine;
