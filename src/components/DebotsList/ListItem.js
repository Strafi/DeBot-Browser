import React from 'react';
import tonClientController from 'src/tonClient';
import { Link } from 'react-router-dom';
import { createDebotUrl } from 'src/helpers';
import { DEV_NETWORK, MAIN_NETWORK } from 'src/constants';
import { MainNetIcon, DevNetIcon } from 'src/components/icons';

const ListItem = ({ debot, isGrey }) => {
	const linkAddress = createDebotUrl(debot.address);
	const listItemClassName = `debots-list__item ${isGrey ? 'debots-list__item--grey' : ''}`;

	const handleNetworkSwitch = () => {
		if (debot.network)
			tonClientController.setSelectedNetwork(debot.network);
	}

	return (
		<Link to={linkAddress} className={listItemClassName} onClick={handleNetworkSwitch}>
			<div className='debots-list__item-title'>
				{debot.title}
				{debot.network === DEV_NETWORK && <DevNetIcon />}
				{debot.network === MAIN_NETWORK && <MainNetIcon />}
			</div>
			<div className='debots-list__item-address'>
				{debot.address}
			</div>
		</Link>
	);
}

export default ListItem;
