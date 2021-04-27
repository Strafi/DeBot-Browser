import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addEnvVariable, removeEnvVariable, isWindows } from 'src/helpers';
import './index.scss';

const Environment = () => {
	const envVariables = useSelector(state => state.environment.variables);
	const envEntries = Object.entries(envVariables);
	const [envKey, setEnvKey] = useState('');
	const [envValue, setEnvValue] = useState('');

	const handleKeyChange = e => setEnvKey(e.target.value);

	const handleValueChange = e => setEnvValue(e.target.value);

	const handleAddVariable = () => {
		if (envKey && envValue) {
			addEnvVariable(envKey, envValue);
			setEnvKey('');
			setEnvValue('');
		}
	};

	const renderVariablesTableItems = () => envEntries.map(([key, value]) => (
		<div key={key} className='environment__table-row'>
			<div className='environment__table-col environment__table-col--title'>{key}</div>
			<div className='environment__table-col'>{value}</div>
		</div>
	));

	return (
		<div className='environment'>
			<div className={`environment__table--wrapper ${isWindows() ? 'with-custom-scrollbar' : ''}`}>
				{!!envEntries.length
					? <div className='environment__table'>
						{renderVariablesTableItems()}
					</div>
					: <div className='environment__image'>
						<img src='/env-icon.svg' alt='Environment'/>
						<div className='environment__image-text'>
							Here you can store something to use it later (address or public key, for example).
						</div>
						<div className='environment__image-text environment__image-text--warning'>
							This storage is not encrypted, so you should not store private keys or seed-phrase here.
						</div>
					</div>
				}
			</div>
			<div className='environment__input-container'>
				<input
					className='stage-component__input'
					type='text'
					placeholder='Key'
					value={envKey}
					onChange={handleKeyChange}
				/>
				<span className='environment__divider'>:</span>
				<input
					className='stage-component__input'
					type='text'
					placeholder='Value'
					value={envValue}
					onChange={handleValueChange}
				/>
			</div>
			<div onClick={handleAddVariable} className='environment__submit-button'>Add variable</div>
		</div>
	);
}

export default Environment;
