import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { DEngine } from 'src/debot';
import { useSearchParams } from 'src/helpers';
import { StagesController } from 'src/components';

const DebotPage = () => {
	const searchParams = useSearchParams();
	const debotAddress = searchParams.get('debotAddress');

	useEffect(() => {
		const asyncEffect = async () => {
			if (debotAddress) {
				try {
					await DEngine.runDebot(debotAddress);
				} catch (err) {
					console.error('Error while running debot: ', err);
				}
			}
		}
		
		asyncEffect();
	}, [debotAddress]);

	if (!debotAddress)
		return <Redirect to='/' />

	return (
		<div>
			<StagesController />
		</div>
	)
}

export default DebotPage;
