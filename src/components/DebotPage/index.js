import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DEngine } from 'src/debot';
import { useSearchParams } from 'src/helpers';
import { StagesController, SigningBox } from 'src/components';

const DebotPage = () => {
	const searchParams = useSearchParams();
	const isSigningBoxVisible = useSelector(state => !!state.debot.signingBox);
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

	const pageClassName = `debot-page ${isSigningBoxVisible ? 'debot-page--scroll-disabled' : ''}`;

	return (
		<div className={pageClassName}>
			<StagesController />
			{isSigningBoxVisible && <SigningBox />}
		</div>
	)
}

export default DebotPage;
