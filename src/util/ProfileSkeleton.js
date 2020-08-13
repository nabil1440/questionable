import React from 'react';
import PropTypes from 'prop-types';
import NoImg from '../images/no-img.png';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
	},
	handle: {
		heigth: 20,
		background: '#37474f',
		margin: '0 auto 7px auto',
		width: 60
	},
	fullLine: {
		height: 16,
		background: '#ccc',
		width: '100%',
		marginBottom: 10
	},
	halfLine: {
		height: 16,
		background: '#ccc',
		width: '50%',
		marginBottom: 10
	}
};

const ProfileSkeleton = props => {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={NoImg} className="profile-image" alt="Profile" />
				</div>
				<hr />
				<div className="profile-details">
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOnIcon color="primary" /> <span>Location</span>
					<hr />
					<LinkIcon color="primary" /> <span>https://website.com</span>
					<hr />
					<CalendarTodayIcon color="primary" /> <span>Joined date</span>
				</div>
			</div>
		</Paper>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
