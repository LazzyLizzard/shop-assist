import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
}));

export const Header = ({measureText = '...', sidebarToggler}) => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={sidebarToggler}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {measureText}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
