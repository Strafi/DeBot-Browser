import React from 'react';
import { Link } from 'react-router-dom';
import { createDebotUrl } from 'src/helpers';

const ListItem = ({ debot, isGrey }) => {
	const linkAddress = createDebotUrl(debot.address);
	const listItemClassName = `debots-list__item ${isGrey ? 'debots-list__item--grey' : ''}`;

	return (
		<Link to={linkAddress} className={listItemClassName}>
			<div className='debots-list__item-title'>
				{debot.label || debot.title}
			</div>
			<div className='debots-list__item-address'>
				{debot.address}
			</div>
		</Link>
	);
}

export default ListItem;
