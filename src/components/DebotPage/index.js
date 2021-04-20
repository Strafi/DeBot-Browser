import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DEngine } from 'src/debot';
import { useSearchParams } from 'src/helpers';
import { clearStage } from 'src/store/actions/debot';
import { SigningBox, ApproveWindow } from 'src/components';
import Stage from './Stage';
import './index.scss';

const DebotPage = () => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const [isDebotError, setIsDebotError] = useState(false);
	const isSigningBoxVisible = useSelector(state => !!state.debot.signingBox);
	const isApproveWindowVisible = useSelector(state => !!state.debot.approveWindow);
	const debotAddress = searchParams.get('debotAddress');

	useEffect(() => {
		const asyncEffect = async () => {
			if (debotAddress) {
				try {
					await DEngine.runDebot(debotAddress);
				} catch (err) {
					setIsDebotError(true);
					console.error('Error while running debot: ', err);
				}
			}
		}
		
		asyncEffect();

		return () => {
			dispatch(clearStage());
		}
	}, [debotAddress, dispatch]);

	if (!debotAddress)
		return <Redirect to='/' />

	const isScrollDisabled = isSigningBoxVisible || isApproveWindowVisible;
	const pageClassName = `debot-page ${isScrollDisabled ? 'debot-page--scroll-disabled' : ''}`;

	return (
		<div className={pageClassName}>
			<div className='debot-page__controls'>
				<div
					className='debot-page__controls-item'
				>
					Clear History
				</div>
			</div>
			<Stage isDebotError={isDebotError} />
			{isSigningBoxVisible && <SigningBox />}
			{isApproveWindowVisible && <ApproveWindow />}
		</div>
	)
}

export default DebotPage;
