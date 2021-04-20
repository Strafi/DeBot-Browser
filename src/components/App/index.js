import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { isWindows } from 'src/helpers';
import { Header, DebotsList, DebotPage } from 'src/components';
import './index.scss';

const App = () => {
	const appClassName = `app-container ${isWindows() ? 'with-custom-scrollbar' : ''}`;

	return (
		<div className={appClassName}>
			<div className='app-container__flex-wrapper'>
				<Header />
				<Switch>
					<Route exact path='/' component={DebotsList} />
					<Route path='/debot' component={DebotPage} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
