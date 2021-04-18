import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { BackIcon } from 'src/components/icons';
import SearchBar from '../SearchBar';
import './index.scss';

const Header = () => {
	const match = useRouteMatch('/debot');

	return (
		<header className='header-container'>
			<Link to='/'><h1>Free TON DeBot Browser</h1></Link>
			{match
				&& <Link to='/' className='header-container__back-button'>
					<BackIcon />
					<p>Back</p>
				</Link>
			}
			<SearchBar />
		</header>
	);
}

export default Header;
