import React from 'react';

//MUI Stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, tip, onClick, btnClassName, tipClassName }) => (
	<Tooltip title={tip} className={tipClassName} placement="top">
		<IconButton className={btnClassName} onClick={onClick}>
			{children}
		</IconButton>
	</Tooltip>
);
