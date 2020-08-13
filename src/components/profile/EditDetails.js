import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

//Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../..//redux/actions/userActions';

const styles = {};

class EditDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false
	};

	mapUserDetailsToState = credentials => {
		this.setState({
			bio: credentials.bio ? credentials.bio : '',
			website: credentials.website ? credentials.website : '',
			location: credentials.location ? credentials.location : ''
		});
	};

	handleOpen = () => {
		this.setState({
			open: true
		});
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<MyButton
					tip="Edit details"
					onClick={this.handleOpen}
					btnClassName={classes.button}
				>
					<EditIcon color="primary" />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					maxWidth="sm"
					fullWidth={true}
				>
					<DialogTitle>Edit you details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								row="3"
								placeholder="A short bio of yourself"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.onChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="text"
								label="Website"
								placeholder="Link to your website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.onChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Your location"
								className={classes.textField}
								value={this.state.location}
								onChange={this.onChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
	withStyles(styles)(EditDetails)
);
