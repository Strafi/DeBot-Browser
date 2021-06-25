import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, DebotsList, DebotPage, AddAccount } from 'src/components';
import './index.scss';

const App = () => {
	const isAccountModalVisible = useSelector(state => !!state.account.addAccountModal);

	return (
		<div className='app-container'>
			<Header />
			<div className='app-container__flex-wrapper'>
				<Switch>
					<Route exact path='/' component={DebotsList} />
					<Route path='/debot' component={DebotPage} />
				</Switch>
				{isAccountModalVisible && <AddAccount />}
			</div>
		</div>
	);
}

export default App;
