import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import tonClientController from 'src/tonClient';
import { BackIcon, MainNetIcon, DevNetIcon } from 'src/components/icons';
import { OptionsList } from 'src/components';
import { MAIN_NETWORK, DEV_NETWORK } from 'src/constants';
import SearchBar from '../SearchBar';
import './index.scss';

const Header = () => {
	const [selectedNetwork, setSelectedNetwork] = useState(tonClientController.selectedNetwork);
	const match = useRouteMatch('/debot');

	useEffect(() => {
		setSelectedNetwork(tonClientController.selectedNetwork);
	}, [match]);

	const handleSelectNetwork = (network) => {
		tonClientController.setSelectedNetwork(network);
		setSelectedNetwork(network);
	}

	const renderSelectedItem = () => (
		<div className='options-list__selected-item'>
			{selectedNetwork === DEV_NETWORK ? <DevNetIcon /> : <MainNetIcon />}
		</div>
	)

	const backButtonClassName = `header-container__back-button ${!match ? 'header-container__back-button--disabled' : ''}`

	return (
		<header className='header-container'>
			<Link to='/' className={backButtonClassName}>
				<BackIcon />
			</Link>
			<SearchBar />
			<div className='header-container__settings-bar'>
				<OptionsList selectedItem={renderSelectedItem()} height={84} width={200} isDisabled={!!match}>
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
			</div>
		</header>
	);
}

export default Header;
