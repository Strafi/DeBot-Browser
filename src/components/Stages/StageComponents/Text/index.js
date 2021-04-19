import React, { useEffect } from 'react';
import { useDebotAddress } from 'src/helpers';
import { DEngine } from 'src/debot';
import './index.scss';

const Text = ({ params }) => {
	const debotAddress = useDebotAddress();
	const { text, functionId, interfaceAddress } = params;

	useEffect(() => {
		const runDebotFunction = async () => {
			try {
				await DEngine.callDebotFunction(debotAddress, interfaceAddress, functionId);
			} catch(err) {
				console.error(err);
			}
		};
		
		if (functionId && functionId !== '0')
			runDebotFunction();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='stage-component__text'>
			{text}
		</div>
	)
};

export default Text;
