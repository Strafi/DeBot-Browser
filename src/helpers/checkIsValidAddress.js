import tonClient from 'src/tonClient';

async function checkIsValidAddress(address) {
	try {
		const result = await tonClient.utils.convert_address({
			address,
			output_format: {
				type: 'Hex',
			}
		})

		return !!result;
	} catch (err) {
		return false;
	}
}

export default checkIsValidAddress;
