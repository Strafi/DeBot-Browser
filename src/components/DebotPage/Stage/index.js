import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { COMPONENTS_BINDINGS } from 'src/constants';
import { isWindows } from 'src/helpers';
import { Loader } from 'src/components';
import {
	Text,
	Input,
	AddressInput,
	Textarea,
	AmountInput,
	ConfirmInput,
	Menu,
} from './StageComponents';
import './index.scss';

class Stage extends Component {
	stageRef = createRef(null);

	stageComponents = {
		[COMPONENTS_BINDINGS.INPUT]: Input,
		[COMPONENTS_BINDINGS.TEXTAREA]: Textarea,
		[COMPONENTS_BINDINGS.AMOUNT_INPUT]: AmountInput,
		[COMPONENTS_BINDINGS.CONFIRM_INPUT]: ConfirmInput,
		[COMPONENTS_BINDINGS.ADDRESS_INPUT]: AddressInput,
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

	componentDidUpdate(prevProps) {
		if (prevProps.stage.length !== this.props.stage.length) {
			if (this.stageRef?.current)
				setTimeout(() => this.stageRef.current.scrollTop = this.stageRef.current.scrollHeight, 0);
		}
	}

	render() {
		const { stage, isDebotError } = this.props;

		if (!stage.length) {
			return <Loader isFailed={isDebotError} />
		}

		const stageComponents = this.formStageComponents();

		const stageClassName = `stage ${isWindows() ? 'with-custom-scrollbar' : ''}`;

		return (
			<div ref={this.stageRef} className={stageClassName}>
				<div className='stage__container'>
					{stageComponents}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ debot: { stage } }) => ({ stage });

export default connect(mapStateToProps)(Stage);
