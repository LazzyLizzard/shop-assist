import React from 'react';
import {Button, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    buttonSmall: {
        padding: theme.spacing(0.5),
        border: 'solid 1px #000',
        // background: '#fff'
    }
}));

export const RemoveButton = ({allowDelete, onRemove, iconComponent}) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.buttonSmall}
            disabled={!allowDelete}
            color="secondary"
            onClick={onRemove}
        >
            <DeleteIcon/>
        </Button>
    );
};
