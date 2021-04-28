import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addEnvVariable, removeEnvVariable, isWindows } from 'src/helpers';
import { CancelIcon } from 'src/components/icons';
import './index.scss';

const Environment = () => {
	const envVariables = useSelector(state => state.environment.variables);
	const envEntries = Object.entries(envVariables);
	const [envKey, setEnvKey] = useState('');
	const [envValue, setEnvValue] = useState('');
	const [isCopiedVisible, setIsCopiedVisible] = useState(false);

	const handleKeyChange = e => setEnvKey(e.target.value);

	const handleValueChange = e => setEnvValue(e.target.value);

	const handleAddVariable = () => {
		if (envKey && envValue) {
			addEnvVariable(envKey, envValue);
			setEnvKey('');
			setEnvValue('');
		}
	};

	const handleRemoveVariable = (e, key) => {
		e.stopPropagation();
		
		removeEnvVariable(key);
	}

	const copyToClipboard = async value => {
		try {
			await navigator.clipboard.writeText(value);

			setIsCopiedVisible(true);

			setTimeout(() => setIsCopiedVisible(false), 2000);
		} catch(err) {
			console.error('Clipboard API not supported');
		}
	}

	const renderVariablesTableItems = () => envEntries.map(([key, value]) => (
		<div key={key} className='environment__table-row'>
			<div className='environment__table-col environment__table-col--cancel'>
				<CancelIcon onClick={e => handleRemoveVariable(e, key)}/>
			</div>
			<div className='environment__table-col environment__table-col--title'>{key}</div>
			<div className='environment__table-col environment__table-col--clickable' onClick={() => copyToClipboard(value)}>{value}</div>
		</div>
	));

	const copiedIndicatorClassName = `environment__copied-indicator ${isCopiedVisible ? 'environment__copied-indicator--visible' : ''}`;

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
			<div className='environment__footer'>
				<div className={copiedIndicatorClassName}>Copied to clipboard!</div>
				<div onClick={handleAddVariable} className='environment__submit-button'>Add variable</div>
			</div>
		</div>
	);
}

export default Environment;