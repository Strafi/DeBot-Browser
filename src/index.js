import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from 'src/store'
import { App } from 'src/components';
import { isWindows } from 'src/helpers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'src/styles/index.scss';

require('dotenv').config();

if (isWindows) {
	document.querySelector('body')?.classList.add('with-custom-scrollbar');
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

serviceWorkerRegistration.register();
