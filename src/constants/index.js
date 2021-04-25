const DB_CONTENT_TYPES = {
	DEBOT: 'debot',
}

const COMPONENTS_BINDINGS = {
	TEXT: 'Text',
	INPUT: 'Input',
	TEXTAREA: 'Textarea',
	AMOUNT_INPUT: 'AmountInput',
	CONFIRM_INPUT: 'ConfirmInput',
	ADDRESS_INPUT: 'AddressInput',
	TOKENS_INPUT: 'TokensInput',
	MENU: 'Menu',
	STDOUT: 'Stdout',
}

const EXPLORER_BASE_URL = 'https://ton.live/accounts/accountDetails?id=';

const DEBOT_ADDRESS_SEARCH_PARAM = 'debotAddress';

const DEBOT_WC = -31;
const MNEMONIC_WORD_COUNT = 12;
const DERIVATION_PATH = "m/44'/396'/0'/0/0";

module.exports = {
	EXPLORER_BASE_URL,
	DB_CONTENT_TYPES,
	COMPONENTS_BINDINGS,
	DEBOT_ADDRESS_SEARCH_PARAM,
	DEBOT_WC,
	MNEMONIC_WORD_COUNT,
	DERIVATION_PATH,
}
