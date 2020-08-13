import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';

const styles = {
	paper: {
		padding: 20
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#37474f'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	}
};

class Profile extends Component {
	handleImageChange = e => {
		const image = e.target.files[0];
		const formData = new FormData();

		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};

	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated
			}
		} = this.props;

		let profileMarkUp = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img src={imageUrl} alt="Profile" className="profile-image" />
							<input
								type="file"
								id="imageInput"
								onChange={this.handleImageChange}
								hidden="hidden"
							/>
							<MyButton
								tip="Edit profile picture"
								btnClassName="button"
								onClick={this.handleEditPicture}
							>
								<EditIcon color="primary" />
							</MyButton>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="h5"
							>
								@{handle}
							</MuiLink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<React.Fragment>
									<LocationOnIcon color="primary" /> <span>{location}</span>
									<hr />
								</React.Fragment>
							)}
							{website && (
								<React.Fragment>
									<LinkIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
									<hr />
								</React.Fragment>
							)}
							<CalendarTodayIcon color="primary" />{' '}
							<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
						</div>
						<MyButton tip="Log out" onClick={this.handleLogout}>
							<KeyboardTabIcon color="primary" />
						</MyButton>
						<EditDetails />
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found, please login again.
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="secondary"
							component={Link}
							to="/signup"
						>
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<ProfileSkeleton />
		);

		return profileMarkUp;
	}
}

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));
