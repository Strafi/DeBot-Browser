import React, { Component } from 'react';
import { Loader } from 'src/components'; 
import DebotListItem from './ListItem';
import './index.scss';

const DEBOTS_LIST = [
	{ title: 'TIP-3 DeBot', address: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317' },
	{ title: 'SMV DeBot', address: '0:704c8d64aed3c79e84ab1a8fc7076de287aa8ddbb967687ce1342d71bd73ff32' },
];

class DebotsList extends Component {
	state = {
		isLoaderVisible: false,
	}

	renderDebotListItems = () => {
		const debotListItems = DEBOTS_LIST.map((debot, index) => (
			<DebotListItem
				isGrey={index % 2 === 0 || index === 0}
				debot={debot}
				key={debot.address}
			/>
		));

		return debotListItems;
	}

	render() {
		const { isLoaderVisible } = this.state;

		return (
			<div className='contests-list'>
				{isLoaderVisible
					? <Loader />
					: true
						? this.renderDebotListItems()
						: <Loader isFailed />
				}
			</div>
		);
	}
}

export default DebotsList;
