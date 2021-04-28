import React, { useState, useContext } from 'react';
import tonClientController from 'src/tonClient';
import { addLocalDebot } from 'src/helpers';
import { ControlWithPopupContext } from 'src/contexts';
import { OptionsList } from 'src/components';
import { MainNetIcon, DevNetIcon } from 'src/components/icons';
import { MAIN_NETWORK, DEV_NETWORK } from 'src/constants';
import './index.scss';

const AddDebot = ({ prefilledAddress = '' }) => {
	const popupContext = useContext(ControlWithPopupContext);
	const [debotName, setDebotName] = useState('');
	const [debotAddress, setDebotAddress] = useState(prefilledAddress);
	const [selectedNetwork, setSelectedNetwork] = useState(tonClientController.selectedNetwork);

	const handleAddressChange = e => setDebotAddress(e.target.value);

	const handleLabelChange = e => setDebotName(e.target.value);

	const handleAddDebot = () => {
		if (debotName && debotAddress) {
			const debotObj = {
				title: debotName,
				address: debotAddress,
				network: selectedNetwork,
			}

			addLocalDebot(debotObj);

			if (popupContext)
				popupContext.closePopup();
		}
	};

	const renderSelectedItem = () => (
		<div className='options-list__selected-item'>
			{selectedNetwork === DEV_NETWORK ? <DevNetIcon /> : <MainNetIcon />}
			{selectedNetwork}
		</div>
	)

	return (
		<div className='add-debot'>
			<div className='add-debot__horizontal-inputs'>
				<div className='stage-component__input-container'>
					<span className='stage-component__input-label'>DeBot name</span>
					<input
						className='stage-component__input'
						type='text'
						placeholder='Enter...'
						value={debotName}
						onChange={handleLabelChange}
					/>
				</div>
				<OptionsList selectedItem={renderSelectedItem()} height={84} width={200}>
					<div
						className='options-list__list-item'
						onClick={() => setSelectedNetwork(MAIN_NETWORK)}
					>
						<MainNetIcon />
						{MAIN_NETWORK}
					</div>
					<div
						className='options-list__list-item'
						onClick={() => setSelectedNetwork(DEV_NETWORK)}
					>
						<DevNetIcon />
						{DEV_NETWORK}
					</div>
				</OptionsList>
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
