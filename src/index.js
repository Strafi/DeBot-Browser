import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from 'src/store'
import { App } from 'src/components';
import { isCustomScrollBar } from 'src/helpers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'src/styles/index.scss';

require('dotenv').config();

if (isCustomScrollBar()) {
	document.querySelector('body')?.classList.add('with-custom-scrollbar');
}

const routerParams = {};

if (process.env.REACT_APP_ROUTER_BASENAME)
	routerParams.basename = `/${process.env.REACT_APP_ROUTER_BASENAME}`;

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter { ...routerParams }>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

serviceWorkerRegistration.register();
