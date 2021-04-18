import React, { useState, useRef, useEffect } from 'react';
import { useDebotAddress, encodeString } from 'src/helpers';
import { DEngine } from 'src/debot';
import './index.scss';

const Input = ({ params, type = 'text', isMultiline = false }) => {
	const debotAddress = useDebotAddress();
	const [inputValue, setInputValue] = useState('');
	const [errorText, setErrorText] = useState('');
	const inputRef = useRef(null);
	const { text, interfaceAddress, functionId } = params;

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	const handleInputChange = event => {
		setInputValue(event.target.value);
		setErrorText('');
	}

	const handleKeyPress = async event => {
		const { shiftKey, key, altKey } = event;
		const isEnter = key === 'Enter';
		const shouldTriggerFunction = isEnter && !shiftKey && !altKey && !errorText && inputValue;

		if (shouldTriggerFunction) {
			event.preventDefault();

			try {
				await DEngine.callDebotFunction(debotAddress, interfaceAddress, functionId, { value: encodeString(inputValue) });
			} catch(err) {
				setErrorText(err.message);
			}
		}
	}

	const inputClassName = `stage-component__input ${errorText ? 'stage-component__input--error' : ''}`;

	return (
		<div className='stage-component__input-container'>
			<span className='stage-component__input-label'>{text}</span>
			{isMultiline
				? <textarea
					className={inputClassName}
					type={type}
					placeholder='Enter...'
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					ref={inputRef}
				></textarea>
				: <input
					className={inputClassName}
					type={type}
					placeholder='Enter...'
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					ref={inputRef}
				/>
			}
			{errorText && <span className='stage-component__input-error'>{errorText}</span>}
		</div>
	)
};

export default Input;
