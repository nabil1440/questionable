import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.ui.errors) {
			this.setState({ errors: nextProps.ui.errors });
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData, this.props.history);
	};

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
						Login
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
							Login
						</Button>
					</form>
					<br />
					<small>
						Don't have an account? Sign up <Link to="/signup">here</Link>
					</small>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	ui: state.ui
});

const mapActionsToProps = {
	loginUser
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Login));
