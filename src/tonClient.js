import { TonClient } from '@tonclient/core';
import { libWeb } from '@tonclient/lib-web';

// eslint-disable-next-line react-hooks/rules-of-hooks
TonClient.useBinaryLibrary(libWeb);

const client = new TonClient({
	network: {
		server_address: process.env.REACT_APP_TON_NETWORK || 'main.ton.dev',
	},
});

export default client;
