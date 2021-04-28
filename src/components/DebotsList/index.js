import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import tonClientController from 'src/tonClient';
import { Loader, ControlWithPopup, AddDebot, Environment, OptionsList } from 'src/components';
import { MAIN_NETWORK, DEV_NETWORK } from 'src/constants';
import DebotListItem from './ListItem';
import './index.scss';

const DebotsList = () => {
	const [selectedNetwork, setSelectedNetwork] = useState(tonClientController.selectedNetwork);
	const debotsList = useSelector(state => state.debot.debotsList);
	const localDebotsList = useSelector(state => state.debot.localDebotsList);

	const renderDebotListItems = () => debotsList.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={`${debot.address}-${index}`}
		/>
	));

	const renderLocalDebotListItems = () => localDebotsList.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={`${debot.address}-${index}`}
		/>
	));

	const handleSelectNetwork = (network) => {
		tonClientController.setSelectedNetwork(network);
		setSelectedNetwork(network);
	}

	const renderSelectedItem = () => (
		<div className='options-list__selected-item'>
			<img
				src={selectedNetwork === DEV_NETWORK ? '/dev-net-icon.png' : '/main-net-icon.png'}
				alt='selected network'
			/>
			{selectedNetwork}
		</div>
	)

	return (
		<div className='debots-list'>
			<div className='debots-list__controls'>
				<OptionsList selectedItem={renderSelectedItem()} height={84} width={200}>
					<div
						className='options-list__list-item'
						onClick={() => handleSelectNetwork(MAIN_NETWORK)}
					>
						<img src='/main-net-icon.png' alt='main-net' />
						{MAIN_NETWORK}
					</div>
					<div
						className='options-list__list-item'
						onClick={() => handleSelectNetwork(DEV_NETWORK)}
					>
						<img src='/dev-net-icon.png' alt='dev-net' />
						{DEV_NETWORK}
					</div>
				</OptionsList>
				<ControlWithPopup name='Add DeBot'>
					<AddDebot />
				</ControlWithPopup>
				<ControlWithPopup height={464} width={660} name='Show Environment'>
					<Environment />
				</ControlWithPopup>
			</div>
			{!!localDebotsList.length
				&& <Fragment>
					<div className='debots-list__section-title'>Your saved DeBots</div>
					{renderLocalDebotListItems()}
				</Fragment>
			}
			{!!debotsList.length
				&& <Fragment>
					<div className='debots-list__section-title'>Suggested DeBots</div>
					{renderDebotListItems()}
				</Fragment>
			}
			{(!debotsList.length && !localDebotsList.length) && <Loader isFailed />}
		</div>
	);
}

export default DebotsList;
