import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
	},
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%'
	},
	commentData: {
		marginLeft: 20
	}
};

class Comments extends Component {
	render() {
		const { comments, classes } = this.props;
		return (
			<Grid container>
				{comments.map(comment => {
					const { body, createdAt, userImage, userHandle } = comment;
					return (
						<Fragment key={createdAt}>
							<Grid item sm={12}>
								<Grid container>
									<Grid item sm={2}>
										<img
											src={userImage}
											alt="comment"
											className={classes.commentImage}
										/>
									</Grid>
									<Grid item sm={9}>
										<div className={classes.commentData}>
											<Typography
												variant="h5"
												component={Link}
												to={`/users/${userHandle}`}
												color="primary"
											>
												{userHandle}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
											</Typography>
											<hr className={classes.invisibleSeparator} />
											<Typography variant="body1">{body}</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							<hr className={classes.visibleSeparator} />
						</Fragment>
					);
				})}
			</Grid>
		);
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
