import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'src/components'; 
import DebotListItem from './ListItem';
import './index.scss';

const DebotsList = () => {
	const debotsList = useSelector(state => state.debot.debotsList);

	const renderDebotListItems = () => debotsList.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={debot.address}
		/>
	));

	return (
		<div className='contests-list'>
			{!!debotsList.length
				? renderDebotListItems()
				: <Loader isFailed />
			}
		</div>
	);
}

export default DebotsList;
