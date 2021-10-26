import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import tonClientController from '/src/tonClient';
import { BackIcon, MainNetIcon, DevNetIcon, FldNetIcon, NetworkIcon, CancelIcon } from '/src/components/icons';
import { OptionsList } from '/src/components';
import { MAIN_NETWORK, DEV_NETWORK, FLD_NETWORK } from '/src/constants';
import { removeAccount, selectAccount, setAddAccountModal } from '/src/store/actions/account';
import SearchBar from '../SearchBar';
import './index.scss';

const Header = () => {
	const dispatch = useDispatch();
	const [selectedNetwork, setSelectedNetwork] = useState(tonClientController.selectedNetwork);
	const match = useRouteMatch('/debot');
	const { chosenAccountAddress, accountsList } = useSelector(state => state.account);
	const chosenAccount = accountsList.find(account => account.address === chosenAccountAddress) || accountsList[0];

	useEffect(() => {
		setSelectedNetwork(tonClientController.selectedNetwork);
	}, [match]);

	const handleSelectNetwork = (network) => {
		tonClientController.setSelectedNetwork(network);
		setSelectedNetwork(network);
	}

	const renderSelectedNetwork = () => (
		<div className='options-list__selected-item'>
			<NetworkIcon network={selectedNetwork} />
		</div>
	)

	const handleSelectAccount = accountAddress => dispatch(selectAccount(accountAddress));

	const handleRemoveAccount = accountAddress => dispatch(removeAccount(accountAddress));

	const handleAddAccount = () => dispatch(setAddAccountModal({ isVisible: true }));

	const renderSelectedAccount = () => (
		<div className='options-list__selected-item'>
			<span className='selected-text-item'>{chosenAccount.label[0].toUpperCase()}</span>
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
				<OptionsList selectedItem={renderSelectedNetwork()} height={126} width={200} isDisabled={!!match}>
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
					<div
						className='options-list__list-item'
						onClick={() => handleSelectNetwork(FLD_NETWORK)}
					>
						<FldNetIcon />
						{FLD_NETWORK}
					</div>
				</OptionsList>
				{accountsList?.length
					? <OptionsList selectedItem={renderSelectedAccount()} height={'max-content'} width={200}>
						{accountsList.map(account => {
							return <div
								className='options-list__list-item options-list__list-item--with-remove-icon'
								onClick={() => handleSelectAccount(account.address)}
								key={account.address}
							>
								{`${account.label} (${account.address.slice(0, 6)})`}
								<div className='options-list__remove-item-icon'>
									<CancelIcon onClick={e => { e.stopPropagation(); handleRemoveAccount(account.address); }} />
								</div>
							</div>
						})}
						<div
							className='header-container__add-account-button'
							onClick={handleAddAccount}
						>
							Add Account
						</div>
					</OptionsList>
					: <div
						className='header-container__add-account-button'
						onClick={handleAddAccount}
					>
						Add Account
					</div>
				}
			</div>
		</header>
	);
}

export default Header;
