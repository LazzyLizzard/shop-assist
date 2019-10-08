import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttonSmall: {
        borderRadius: '15px'
        // padding: theme.spacing(0.5),
        // border: 'solid 1px #000',
        // background: '#fff'
    }
}));

export const RemoveButton = ({allowDelete, onRemove, buttonText = ''}) => {
    const classes = useStyles();
    return (
        <Button
            size="small"
            // variant="outlined"
            variant="contained"
            className={classes.buttonSmall}
            disabled={!allowDelete}
            color="default"
            onClick={onRemove}
        >
            {buttonText}
        </Button>
    );
};
