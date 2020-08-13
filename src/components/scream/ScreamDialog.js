import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = {
	invisibleSeparator: {
		border: 'none',
		margin: 4
	},
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover'
	},
	dialogContent: {
		padding: 50
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '2%'
	},
	expandButton: {
		position: 'absolute',
		left: '90%'
	},
	spinnerDiv: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px soild #ddd',
		marginBottom: 20
	}
};

class ScreamDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: ''
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}

	handleOpen = () => {
		let oldPath = window.location.pathname;
		const { userHandle, screamId } = this.props;
		const newPath = `/users/${userHandle}/scream/${screamId}`;

		if (oldPath === newPath) oldPath = `/users/${userHandle}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });
		this.props.getScream(this.props.screamId);
	};

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			classes,
			scream: {
				body,
				userImage,
				createdAt,
				userHandle,
				likeCount,
				commentCount,
				screamId,
				comments
			},
			ui: { loading }
		} = this.props;

		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={2}>
				<Grid item sm={5}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7}>
					<Typography
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
						variant="h5"
					>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">{body}</Typography>
					<LikeButton screamId={screamId} />
					<span>{likeCount} likes</span>
					<MyButton tip="comment">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
				</Grid>
				<hr className={classes.visibleSeparator} />
				<CommentForm screamId={screamId} />
				<Comments comments={comments} />
			</Grid>
		);

		return (
			<Fragment>
				<MyButton
					onClick={this.handleOpen}
					tip="Expand scream"
					tipClassName={classes.expandButton}
				>
					<UnfoldMoreIcon color="primary" />
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
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

ScreamDialog.propTypes = {
	getScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	scream: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	scream: state.data.scream,
	ui: state.ui
});

export default connect(mapStateToProps, { getScream, clearErrors })(
	withStyles(styles)(ScreamDialog)
);
