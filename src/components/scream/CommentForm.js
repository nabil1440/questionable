import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
// Icons

const styles = {
	textField: {
		marginBottom: 20
	}
};

class CommentForm extends Component {
	state = {
		body: '',
		errors: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({
				errors: nextProps.ui.errors
			});
		}
		if (!nextProps.ui.errors && !nextProps.ui.loading) {
			this.setState({ body: '' });
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.submitComment(this.props.screamId, { body: this.state.body });
	};

	render() {
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;
		const commentFormMarkup = authenticated ? (
			<Grid item sm={12}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="body"
						type="text"
						label="Comment"
						value={this.state.body}
						error={errors.comment ? true : false}
						helperText={errors.comment}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
					/>
					<Button type="submit" color="primary" variant="contained">
						Comment
					</Button>
				</form>
				<hr className={classes.invisibleSeparator} />
			</Grid>
		) : null;

		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	screamId: PropTypes.string.isRequired,
	submitComment: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	ui: state.ui,
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(
	withStyles(styles)(CommentForm)
);
