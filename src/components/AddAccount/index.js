import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddAccountModal, addAccount } from 'src/store/actions/account';
import { checkIsValidAddress, encodeString } from 'src/helpers';
import { CancelIcon } from 'src/components/icons';
import { DEngine } from 'src/debot';
import './index.scss';

const AddAccount = () => {
	const dispatch = useDispatch();
	const [address, setAddress] = useState('');
	const [pubkey, setPubkey] = useState('');
	const [label, setLabel] = useState('');
	const [isAddressError, setIsAddressError] = useState('');
	const [isPubkeyError, setIsPubkeyError] = useState('');
	const [isLabelError, setIsLabelError] = useState('');
	const { addAccountModal, chosenAccountAddress, accountsList } = useSelector(state => state.account);
	const { debotAddress, interfaceAddress, functionId, isPubkey } = addAccountModal;
	const isCalledFromDeBot = !!debotAddress;

	const executeDebotFunction = async (accountData) => {
		if (accountData && isCalledFromDeBot) {
			try {
				const value = isPubkey ? encodeString(accountData.pubkey) : accountData.address;

				await DEngine.callDebotFunction(debotAddress, interfaceAddress, functionId, { value });

				closeModal();
			} catch(err) {
				console.error(err.message);
			}
		}
	}

	useEffect(() => {
		const accountData = accountsList?.find(account => account.address === chosenAccountAddress);

		executeDebotFunction(accountData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLabelChange = e => {
		setIsLabelError(false);
		setLabel(e.currentTarget.value);
	}

	const handleAddressChange = e => {
		setIsAddressError(false);
		setAddress(e.currentTarget.value);
	}

	const handlePubkeyChange = e => {
		setIsPubkeyError(false);
		setPubkey(e.currentTarget.value);
	}

	const closeModal = () => dispatch(setAddAccountModal(null));

	const handleAddAccount = async (e) => {
		e.preventDefault();

		const isValidAddress = await checkIsValidAddress(address);
		const isValidLabel = !!label;
		const isValidPubkey = !!pubkey;
		const hasErrors = !isValidAddress || !isValidLabel || !isValidPubkey;

		!isValidAddress && setIsAddressError(true);
		!isValidLabel && setIsLabelError(true);
		!isValidPubkey && setIsPubkeyError(true);

		if (hasErrors)
			return;

		const accountData = {
			label,
			address,
			pubkey,
		};

		dispatch(addAccount(accountData));
		executeDebotFunction(accountData);
		closeModal();
	};

	return (
		<div className='add-account'>
			<div className='add-account__container'>
				{!isCalledFromDeBot
					&& <div className='add-account__cancel-icon'>
						<CancelIcon onClick={closeModal} />
					</div>
				}
				<div className='add-account__header'>
					Add new Account
				</div>
				<div className='add-account__description'>
					Account data will be used to communicate with DeBots
				</div>
				<form onSubmit={handleAddAccount} className='add-account__form'>
					<div className='stage-component__input-container'>
						<span className='stage-component__input-label'>Label</span>
						<input
							className={`stage-component__input ${isLabelError ? '' : 'with-margin-for-errors '}`}
							type='text'
							placeholder='Enter...'
							value={label}
							onChange={handleLabelChange}
						/>
						{!!isLabelError && <span className='stage-component__input-error'>Field is required!</span>}
					</div>
					<div className='stage-component__input-container'>
						<span className='stage-component__input-label'>Address</span>
						<input
							className={`stage-component__input ${isAddressError ? '' : 'with-margin-for-errors '}`}
							type='text'
							placeholder='Enter...'
							value={address}
							onChange={handleAddressChange}
						/>
						{!!isAddressError && <span className='stage-component__input-error'>Invalid address!</span>}
					</div>
					<div className='stage-component__input-container'>
						<span className='stage-component__input-label'>Public Key</span>
						<input
							className={`stage-component__input ${isPubkeyError ? '' : 'with-margin-for-errors '}`}
							type='text'
							placeholder='Enter...'
							value={pubkey}
							onChange={handlePubkeyChange}
						/>
						{!!isPubkeyError && <span className='stage-component__input-error'>Field is required!</span>}
					</div>
				</form>
				<div className='add-account__confirm'>
					<div
						onClick={handleAddAccount}
						className='stage-component__confirm-input-button'
					>
						Save
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddAccount;
