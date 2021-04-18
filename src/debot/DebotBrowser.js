import tonClient from 'src/tonClient';
import { DEBOT_WC } from 'src/constants';
import InterfacesController from './interfaces';

class DebotBrowser {
	constructor() {
		this.debot_handle = null;
		this.debot_abi = null;
		this.info = null;
	}

	setDebotParams(params) {
		const { debot_handle, debot_abi, info } = params;

		this.debot_handle = debot_handle;
		this.debot_abi = debot_abi;
		this.info = info;
	}

	log(loggerParams) {
		const browserParams = {
			debot_handle: this.debot_handle,
			debot_abi: this.debot_abi,
			info: this.info,
		};
		console.log(browserParams, loggerParams);
	};

    switch(params) {
		console.log(params)
	};

    switch_completed() {
		console.log({ msg: 'Switch completed' })
	};

    show_action(params) {
		console.log(params)
	};

    input(params) {
		console.log(params)
	};

    get_signing_box() {
		console.log({ msg: 'get signing box method' })
	};

    invoke_debot(params) {
		console.log(params)
	};

    async send(params) {
		const parsedMessage = await tonClient.boc.parse_message({ boc: params.message })

		const { dst, src, dst_workchain_id } = parsedMessage.parsed;
		const [, interfaceId] = dst.split(':');

		if (dst_workchain_id === DEBOT_WC) {
			InterfacesController.delegateToInterface(interfaceId, {
				debotAddress: src,
				...params,
			});
		} else {
			console.log('call other debot', parsedMessage, params);
			// call other debot
		}
	};

    approve(params) {
		console.log(params)
	};
}

export default DebotBrowser;