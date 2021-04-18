/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createDebotUrl, checkIsValidAddress } from 'src/helpers';
import { LensIcon } from 'src/components/icons';
import './index.scss';

class SearchBar extends Component {
	state = {
		inputValue: '',
		isInvalidAddress: false,
	}

	searchDebot = async () => {
		const { inputValue: debotAddress } = this.state;
		const { history } = this.props;

		if (!debotAddress)
			return;

		const isValidAddress = await checkIsValidAddress(debotAddress);

		if (!isValidAddress)
			return this.setState({ isInvalidAddress: true });

		const debotUrl = createDebotUrl(debotAddress);

		return history.push(debotUrl);
	}

	handleInputChange = event => {
		this.setState({
			inputValue: event.target.value,
			isInvalidAddress: false,
		});
	}

	handleKeyPress = event => {
		const { shiftKey, key, altKey } = event;
		const isEnter = key === 'Enter';
		const shouldSearch = isEnter && !shiftKey && !altKey;

		if (shouldSearch) {
			event.preventDefault();
			this.searchDebot();
		}
	}

	render() {
		const { inputValue, isInvalidAddress } = this.state;

		const searchBarClassName = `search-bar-container ${isInvalidAddress ? 'search-bar-container--invalid' : ''}`;

		return (
			<div className={searchBarClassName}>
				<input
					className='search-bar-container__input'
					type='text'
					placeholder='Enter debot address'
					value={inputValue}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
				/>
				<LensIcon onClick={this.searchDebot} />
			</div>
		);
	}
}

export default withRouter(SearchBar);
