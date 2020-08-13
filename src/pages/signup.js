import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
	form: {
		textAlign: 'center',
		marginBottom: 10
	},
	pageTitle: { margin: '10px auto 10px auto' },
	image: {
		margin: '10px auto 10px auto'
	},
	textField: { margin: '10px auto 10px auto' },
	button: { marginTop: '20px', position: 'relative' },
	customError: {
		color: 'red',
		fontSize: '.8rem',
		marginTop: 20
	},
	progress: {
		position: 'absolute'
	}
};

class SignUp extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
		errors: {}
	};

	handleSubmit = e => {
		e.preventDefault();
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle
		};
		this.props.signupUser(newUserData, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({ errors: nextProps.ui.errors });
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const {
			classes,
			ui: { loading }
		} = this.props;
		const { errors } = this.state;

		return (
			<Grid container>
				<Grid item sm />
				<Grid item sm className={classes.form}>
					<img
						src={AppIcon}
						alt="Question mark"
						height="90"
						width="90"
						className={classes.image}
					/>
					<Typography
						variant="h3"
						className={classes.pageTitle}
						color="primary"
					>
						SignUp
					</Typography>

					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							helperText={errors.email}
							error={errors.email ? true : false}
							className={classes.textField}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							helperText={errors.password}
							error={errors.password ? true : false}
							className={classes.textField}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							className={classes.textField}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id="handle"
							name="handle"
							type="text"
							label="handle"
							helperText={errors.handle}
							error={errors.handle ? true : false}
							className={classes.textField}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							fullWidth={true}
							disabled={loading}
						>
							{loading && (
								<CircularProgress size={20} className={classes.progress} />
							)}
							Signup
						</Button>
					</form>
					<br />
					<small>
						Already have an account? Login <Link to="/login">here</Link>
					</small>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.users,
	ui: state.ui
});

export default connect(mapStateToProps, { signupUser })(
	withStyles(styles)(SignUp)
);
