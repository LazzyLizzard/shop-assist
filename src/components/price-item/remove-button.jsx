import React from 'react';
import {Button} from '@material-ui/core';

// TODO [sf] 14.10.2019 bring back styles as design clears up
// const useStyles = makeStyles((theme) => ({
//     buttonSmall: {
//         borderRadius: '15px'
//     }
// }));

export const RemoveButton = ({allowDelete, onRemove, buttonText = ''}) => {
    // const classes = useStyles();
    return (
        <Button
            size="small"
            variant="contained"
            // className={classes.buttonSmall}
            disabled={!allowDelete}
            // color="default"
            onClick={onRemove}
        >
            {buttonText}
        </Button>
    );
};
