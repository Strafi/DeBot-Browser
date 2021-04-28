import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import tonClientController from 'src/tonClient';
import { Loader, ControlWithPopup, AddDebot, Environment, OptionsList } from 'src/components';
import { MainNetIcon, DevNetIcon } from 'src/components/icons';
import { MAIN_NETWORK, DEV_NETWORK } from 'src/constants';
import DebotListItem from './ListItem';
import './index.scss';

const DebotsList = () => {
	const [selectedNetwork, setSelectedNetwork] = useState(tonClientController.selectedNetwork);
	const debotsList = useSelector(state => state.debot.debotsList);
	const localDebotsList = useSelector(state => state.debot.localDebotsList);
	const filterKey = useSelector(state => state.debot.filterKey);
	const filteredDebots = debotsList.filter(debot => debot.title.toLowerCase().startsWith(filterKey) || debot.address.startsWith(filterKey));
	const filteredLocalDebots = localDebotsList.filter(debot => debot.title.toLowerCase().startsWith(filterKey) || debot.address.startsWith(filterKey));

	const renderDebotListItems = () => filteredDebots.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={`${debot.address}-${index}`}
		/>
	));

	const renderLocalDebotListItems = () => filteredLocalDebots.map((debot, index) => (
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
			{selectedNetwork === DEV_NETWORK ? <DevNetIcon /> : <MainNetIcon />}
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
						<MainNetIcon />
						{MAIN_NETWORK}
					</div>
					<div
						className='options-list__list-item'
						onClick={() => handleSelectNetwork(DEV_NETWORK)}
					>
						<DevNetIcon />
						{DEV_NETWORK}
					</div>
				</OptionsList>
				<ControlWithPopup height={310} width={500} name='Add DeBot'>
					<AddDebot />
				</ControlWithPopup>
				<ControlWithPopup height={472} width={660} name='Show Environment'>
					<Environment />
				</ControlWithPopup>
			</div>
			{!!filteredLocalDebots.length
				&& <Fragment>
					<div className='debots-list__section-title'>Your saved DeBots</div>
					{renderLocalDebotListItems()}
				</Fragment>
			}
			{!!filteredDebots.length
				&& <Fragment>
					<div className='debots-list__section-title'>Suggested DeBots</div>
					{renderDebotListItems()}
				</Fragment>
			}
			{(!filteredDebots.length && !filteredLocalDebots.length) && <Loader isFailed />}
		</div>
	);
}

export default DebotsList;
