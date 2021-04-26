import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Loader, ControlWithPopup, AddDebot } from 'src/components';
import DebotListItem from './ListItem';
import './index.scss';

const DebotsList = () => {
	const debotsList = useSelector(state => state.debot.debotsList);
	const localDebotsList = useSelector(state => state.debot.localDebotsList);

	const renderDebotListItems = () => debotsList.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={debot.address}
		/>
	));

	const renderLocalDebotListItems = () => localDebotsList.map((debot, index) => (
		<DebotListItem
			isGrey={index % 2 === 0 || index === 0}
			debot={debot}
			key={debot.address}
		/>
	));

	return (
		<div className='debots-list'>
			<div className='debots-list__controls'>
				<ControlWithPopup name='Add DeBot'>
					<AddDebot />
				</ControlWithPopup>
				<ControlWithPopup name='Show Environment'>

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
