import React, { Component } from 'react';
import { Loader } from 'src/components'; 
import DebotListItem from './ListItem';
import './index.scss';

class DebotsList extends Component {
	state = {
		isLoaderVisible: false,
	}

	renderDebotListItems = () => {
		// alternative tip-3 '0:75544dd2a08d87659c3125b9da2fb52f8ded49a020e4843334ec2d241978e117';
		const debotsInfo = [
			{ title: 'TIP-3 DeBot', address: '0:81c12c2f4514124536aafea59db7df0262d3af877b4477afe6514bbc5bc9f317' },
			{ title: 'SMV DeBot', address: '0:704c8d64aed3c79e84ab1a8fc7076de287aa8ddbb967687ce1342d71bd73ff32' },
		];

		const debotListItems = debotsInfo.map((debot, index) => (
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
