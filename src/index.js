import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { DatabaseApi } from 'src/api';
import store from 'src/store'
import { App } from 'src/components';

import 'src/styles/index.scss';

require('dotenv').config();

DatabaseApi.init();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
