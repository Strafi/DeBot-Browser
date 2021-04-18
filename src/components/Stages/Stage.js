import React, { Component } from 'react';
import { COMPONENTS_BINDINGS } from 'src/constants';
import {
	Text,
	Input,
	Textarea,
	AmountInput,
	ConfirmInput,
	Menu,
} from './StageComponents';
import './index.scss';

class Stage extends Component {
	stageComponents = {
		[COMPONENTS_BINDINGS.INPUT]: Input,
		[COMPONENTS_BINDINGS.TEXTAREA]: Textarea,
		[COMPONENTS_BINDINGS.AMOUNT_INPUT]: AmountInput,
		[COMPONENTS_BINDINGS.CONFIRM_INPUT]: ConfirmInput,
		[COMPONENTS_BINDINGS.TEXT]: Text,
		[COMPONENTS_BINDINGS.MENU]: Menu,
	}

	formStageComponents = () => {
		const { stage } = this.props;

		return stage.map((stageItem, index) => {
			const Component = this.stageComponents[stageItem.component];

			return <Component key={`${stageItem.functionId}-${index}`} params={stageItem} />
		});
	}

	render() {
		const stageComponents = this.formStageComponents();

		return (
			<div className="stage__container">
				{stageComponents}
			</div>
		)
	}
}

export default Stage;
