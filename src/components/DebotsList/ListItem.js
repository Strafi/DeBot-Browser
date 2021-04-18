import React from 'react';
import { Link } from 'react-router-dom';
import { createDebotUrl } from 'src/helpers';

const ListItem = ({ debot, isGrey }) => {
	const linkAddress = createDebotUrl(debot.address);
	const listItemClassName = `contests-list__item ${isGrey ? 'contests-list__item--grey' : ''}`;

	return (
		<Link to={linkAddress} className={listItemClassName}>
			<div className='contests-list__item-title'>
				{debot.title}
			</div>
		</Link>
	);
}

export default ListItem;
