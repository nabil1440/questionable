import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const styles = {
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10
	},
	progressSpinner: {
		position: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '4%'
	},
	textField: { margin: '10px auto 10px auto' }
};

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {}
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false, errors: {} });
		this.props.clearErrors();
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.postScream({
			body: this.state.body
		});
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({
				errors: nextProps.ui.errors
			});
		}
		if (!nextProps.ui.errors && !nextProps.ui.loading) {
			this.setState({ body: '', open: false, errors: {} });
		}
	}

	render() {
		const { errors } = this.state;
		const {
			classes,
			ui: { loading }
		} = this.props;
		return (
			<Fragment>
				<MyButton tip="Post a scream" onClick={this.handleOpen}>
					<AddIcon />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<MyButton
						tip="close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogTitle>Post a new scream</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								onChange={this.handleChange}
								value={this.state.body}
								label="SCREAM!"
								placeholder="Post a scream to your fellow apes"
								row="3"
								multiline
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	ui: PropTypes.object.isRequired,
	postScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	ui: state.ui
});

export default connect(mapStateToProps, { postScream, clearErrors })(
	withStyles(styles)(PostScream)
);
