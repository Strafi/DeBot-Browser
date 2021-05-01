import React, { useState, useRef, useEffect } from 'react';
import { useDebotAddress } from 'src/helpers';
import { DEngine } from 'src/debot';

function formStepFromDecimals(decimals) {
	if (!decimals || decimals === "0")
		return '1';

	const decimalsInt = parseInt(decimals, 10);
	let resultString = '0.';

	for(let i = 1; i < decimalsInt; i++) {
		resultString += '0';
	}

	resultString += '1';

	return resultString;
}

function formDescription(config) {
	if (config.min && config.max)
		return `Input value must be greater than ${config.min} and less than (or equal) ${config.max}`;
	else if (config.min)
		return `Input value must be greater than ${config.min}`;
	else if (config.max)
		return `Input value must be less than (or equal) ${config.max}`;
	else
		return false;
}

const AmountInput = ({
	params,
	customCallback,
	customErrorText,
	setCustomErrorText,
}) => {
	const debotAddress = useDebotAddress();
	const [inputValue, setInputValue] = useState('');
	const [errorText, setErrorText] = useState('');
	const inputRef = useRef(null);
	const { text, functionId, interfaceAddress, config = {} } = params;
	const inputConfig = {
		min: config.min,
		max: config.max,
		step: formStepFromDecimals(config.decimals),
	};
	const description = formDescription(config);

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	const handleInputChange = event => {
		const { value } = event.target;
		
		if (value === '') {
			setInputValue(event.target.value);
			setErrorText('');

			if (setCustomErrorText)
				setCustomErrorText('');

			return;
		}

		if (!config.decimals || config.decimals === "0") {
			if (value.includes('.')) {
				setErrorText('This input does not support decimals');

				return;
			}
		} else {
			const [, decimalsString] = value.split('.');

			if (decimalsString && parseInt(config.decimals) < decimalsString.length) {
				setErrorText('Too many decimals');

				return;
			}
		}

		const floatValue = parseFloat(value);
		const isOutOfRange = (config.max && floatValue > config.max) || (config.min && floatValue < config.min);

		if (value.includes('e')) {
			setErrorText('Input includes not valid characters');
		} else if (isOutOfRange) {
			setErrorText(description);
		} else {
			setInputValue(event.target.value);
			setErrorText('');

			if (setCustomErrorText)
				setCustomErrorText('');
		}
	}

	const handleKeyPress = async event => {
		const { shiftKey, key, altKey } = event;
		const isEnter = key === 'Enter';
		const shouldTriggerFunction = isEnter && !shiftKey && !altKey && !errorText && inputValue;

		if (shouldTriggerFunction) {
			event.preventDefault();

			try {
				if (customCallback)
					return customCallback(inputValue);

				await DEngine.callDebotFunction(debotAddress, interfaceAddress, functionId, { value: inputValue });
			} catch(err) {
				setErrorText(err.message);
			}
		}
	}

	const inputClassName = `stage-component__input ${errorText ? 'stage-component__input--error' : ''}`;

	return (
		<div className='stage-component__input-container'>
			{!!text && <span className='stage-component__input-label'>{text}</span>}
			{!!description && <div className='stage-component__input-description'>{description}</div>}
			<input
				className={inputClassName}
				type='number'
				placeholder='Enter...'
				value={inputValue}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				ref={inputRef}
				{...inputConfig}
			/>
			{errorText && <span className='stage-component__input-error'>{errorText}</span>}
			{!!customErrorText && <span className='stage-component__input-error'>{customErrorText}</span>}
		</div>
	)
};

export default AmountInput;
