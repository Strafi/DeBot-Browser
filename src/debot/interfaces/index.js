import Terminal from './terminal';
import Menu from './menu';
import AmountInput from './amount_input';
import ConfirmInput from './confirm_input';

class InterfacesController {
	constructor() {
		const terminal = new Terminal();
		const menu = new Menu();
		const amountInput = new AmountInput();
		const confirmInput = new ConfirmInput();

		this.state = new Map([
			[terminal.id, terminal],
			[menu.id, menu],
			[amountInput.id, amountInput],
			[confirmInput.id, confirmInput],
		]);
	}

	delegateToInterface(interfaceId, params) {
		const _interface = this.state.get(interfaceId);

		console.log(`Calling ${_interface?.constructor?.name} by id: ${interfaceId}`);

		try {
			_interface.call(params);
		} catch(_) {
			console.error(`Interface with id ${interfaceId} is not implemented`);
		}
	}
}

const interfacesController = new InterfacesController();

export default interfacesController;
