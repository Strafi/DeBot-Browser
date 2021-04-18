import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'src/components';
import Stage from './Stage';
import './index.scss';

class StagesController extends Component {
	render() {
		const { stages } = this.props;

		if (!stages?.length)
			return <Loader />;

		const lastStage = stages[stages.length - 1];

		return <Stage
			stage={lastStage}
		/>
	}
}

const mapStateToProps = ({ debot }) => {
	const { stages } = debot;

	return {
		stages
	}
};

export default connect(mapStateToProps)(StagesController);
