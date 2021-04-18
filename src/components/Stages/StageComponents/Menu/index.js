import React, { useState } from 'react';
import { useDebotAddress } from 'src/helpers';
import { DEngine } from 'src/debot';
import './index.scss';

const Menu = ({ params }) => {
	const debotAddress = useDebotAddress();
	const [errorText, setErrorText] = useState('');
	const { text, title, interfaceAddress, menuItems } = params;

	const handleSelectItem = async (selectedItem, index) => {
		try {
			await DEngine.callDebotFunction(debotAddress, interfaceAddress, selectedItem.functionId, { index });
		} catch(err) {
			setErrorText(err.message);
		}
	}

	const menuItemsToRender = menuItems.map((item, index) => {
		let menuName = item.title;

		if (item.description)
			menuName += ` ${item.description}`;

		return (
			<div
				onClick={() => handleSelectItem(item, index)}
				key={item.functionId}
				className='stage-component__menu-item'
			>
				{menuName}
			</div>
		);
	});

	return (
		<div className='stage-component__menu-container'>
			<div className='stage-component__menu-title'>{title}</div>
			<div className='stage-component__menu-description'>{text}</div>
			<div className='stage-component__menu-list'>
				{menuItemsToRender}
			</div>
			{errorText && <span className='stage-component__menu-error'>{errorText}</span>}
		</div>
	)
};

export default Menu;
