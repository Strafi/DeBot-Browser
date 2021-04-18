import React from 'react';
import { useDebotAddress } from 'src/helpers';
import { DEngine } from 'src/debot';
import './index.scss';

const ConfirmInput = ({ params }) => {
	const debotAddress = useDebotAddress();
	const { functionId, interfaceAddress, text } = params;

	const handleConfirm = async value => {
		try {
			await DEngine.callDebotFunction(debotAddress, interfaceAddress, functionId, { value });
		} catch(err) {
			console.error(err);
		}
	}

	return (
		<div className='stage-component__confirm-input-container'>
			<div className='stage-component__confirm-input-label'>{text}</div>
			<div
				onClick={() => handleConfirm(true)}
				className='stage-component__confirm-input-button'
			>
				Confirm
			</div>
			<div
				onClick={() => handleConfirm(false)}
				className='stage-component__confirm-input-button stage-component__confirm-input-button--decline'
			>
				Decline
			</div>
		</div>
	)
};

export default ConfirmInput;
