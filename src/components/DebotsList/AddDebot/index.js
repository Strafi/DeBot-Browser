import React, { useState, useContext } from 'react';
import { addLocalDebot } from 'src/helpers';
import ControlWithPopupContext from '../../ControlWithPopup/ControlWithPopupContext';
import './index.scss';

const AddDebot = () => {
	const popupContext = useContext(ControlWithPopupContext);
	const [debotLabel, setDebotLabel] = useState('');
	const [debotAddress, setDebotAddress] = useState('');

	const handleAddressChange = e => setDebotAddress(e.target.value);

	const handleLabelChange = e => setDebotLabel(e.target.value);

	const handleAddDebot = () => {
		if (debotLabel && debotAddress) {
			addLocalDebot(debotLabel, debotAddress);

			if (popupContext)
				console.log(popupContext)
				popupContext.closePopup();
		}
	};

	return (
		<div className='add-debot'>
			<div className='stage-component__input-container'>
				<span className='stage-component__input-label'>DeBot label</span>
				<input
					className='stage-component__input'
					type='text'
					placeholder='Enter...'
					value={debotLabel}
					onChange={handleLabelChange}
				/>
			</div>
			<div className='stage-component__input-container'>
				<span className='stage-component__input-label'>DeBot address</span>
				<input
					className='stage-component__input'
					type='text'
					placeholder='Enter...'
					value={debotAddress}
					onChange={handleAddressChange}
				/>
			</div>
			<div onClick={handleAddDebot} className='add-debot__submit-button'>Add to list</div>
		</div>
	);
}

export default AddDebot;
