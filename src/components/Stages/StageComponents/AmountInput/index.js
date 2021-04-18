import React, { useState, useRef, useEffect } from 'react';
import { useDebotAddress, encodeString } from 'src/helpers';
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

const AmountInput = ({ params }) => {
	const debotAddress = useDebotAddress();
	const [inputValue, setInputValue] = useState('');
	const [errorText, setErrorText] = useState('');
	const inputRef = useRef(null);
	const { text, functionId, interfaceAddress, config } = params;
	const inputConfig = {
		min: config.min,
		max: config.max,
		step: formStepFromDecimals(config.decimals),
	};

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	const handleInputChange = event => {
		const { value } = event.target;
		
		if (value === '') {
			setInputValue(event.target.value);
			setErrorText('');

			return;
		}

		if (!config.decimals || config.decimals === "0") {
			if (value.includes('.'))
				return setErrorText('This input does not support decimals');
		} else {
			const [, decimalsString] = value.split('.');

			if (decimalsString && parseInt(config.decimals) < decimalsString.length) {
				return setErrorText('Too many decimals');
			}
		}

		const floatValue = parseFloat(value);

		if (value !== '' && (value.includes('e') || floatValue > config.max || floatValue < config.min)) {
			setErrorText(`Input value must be greater than ${config.min} and less than (or equal) ${config.max}`);
		} else {
			setInputValue(event.target.value);
			setErrorText('');
		}
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
		</div>
	)
};

export default AmountInput;
