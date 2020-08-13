import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
	state = {
		anchorEl: null
	};

	handleOpen = e => {
		this.setState({
			anchorEl: e.target
		});
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	onMenuOpen = () => {
		let unreadNotIds = this.props.notifications
			.filter(not => !not.read)
			.map(not => not.notificationId);
		this.props.markNotificationsRead(unreadNotIds);
	};

	render() {
		dayjs.extend(relativeTime);
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		let notificationsIcon;
		if (notifications && notifications.length > 0) {
			notifications.filter(not => not.read === false).length > 0
				? (notificationsIcon = (
						<Badge
							badgeContent={
								notifications.filter(not => not.read === false).length
							}
							color="secondary"
						>
							<NotificationsIcon />
						</Badge>
				  ))
				: (notificationsIcon = <NotificationsIcon />);
		} else {
			notificationsIcon = <NotificationsIcon />;
		}

		let notificationsMarkUp =
			notifications && notifications.length > 0 ? (
				notifications.map(not => {
					const verb = not.type === 'like' ? 'liked' : 'commented on';
					const time = dayjs(not.createdAt).fromNow();
					const iconColor = not.read ? 'primary' : 'textSecondary';
					const icon =
						not.type === 'like' ? (
							<FavoriteIcon color={iconColor} styles={{ marginRight: 10 }} />
						) : (
							<ChatIcon color={iconColor} styles={{ marginRight: 10 }} />
						);

					return (
						<MenuItem key={not.createdAt} onClick={this.handleClose}>
							{icon}
							<Typography
								variant="body1"
								color="primary"
								component={Link}
								to={`/users/${not.recipient}/scream/${not.screamId}`}
							>
								{not.sender} {verb} your scream {time}
							</Typography>
						</MenuItem>
					);
				})
			) : (
				<MenuItem ocClick={this.handleClose}>
					You have no notifications yet...
				</MenuItem>
			);

		return (
			<Fragment>
				<Tooltip placement="top" title="Notifications">
					<IconButton
						aria-owns={anchorEl ? 'simple-menu' : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						{notificationsIcon}
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpen}
				>
					{notificationsMarkUp}
				</Menu>
			</Fragment>
		);
	}
}

Notifications.propTypes = {
	notifications: PropTypes.array.isRequired,
	markNotificationsRead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(
	Notifications
);
