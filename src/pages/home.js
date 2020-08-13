import React, { Component } from 'react';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';

//MUI Grid
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {
	componentDidMount() {
		this.props.getScreams();
	}

	render() {
		const { screams, loading } = this.props.data;

		let recentScreamsMarkup = !loading ? (
			screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
		) : (
			<ScreamSkeleton />
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					{recentScreamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

Home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);
