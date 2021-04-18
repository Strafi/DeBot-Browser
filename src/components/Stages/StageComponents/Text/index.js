import React from 'react';
import './index.scss';

const Text = ({ params }) => {
	const { text } = params;
	return (
		<div className='stage-component__text'>
			{text}
		</div>
	)
};

export default Text;
