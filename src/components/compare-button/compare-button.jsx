import React from 'react';
import {noop} from 'lodash';
import {Button, makeStyles} from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const useStyles = makeStyles((theme) => ({
    compareButtonContainer: {
        padding: theme.spacing(3, 0),
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        padding: theme.spacing(2, 6)
    }
}));

export const CompareButton = ({onClick = noop, itemsCount}) => {
    const classes = useStyles();
    return (
        <div className={classes.compareButtonContainer}>
            <Button
                className={classes.button}
                size="large"
                type="button"
                color="primary"
                variant="contained"
                onClick={onClick}
                startIcon={<CompareArrowsIcon />}
            >
                Compare {itemsCount}
            </Button>
        </div>
    );
};
