import React from 'react';
import {noop} from 'lodash';
import {Grid, Button, makeStyles} from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import {MAX_ITEMS} from '../../constants/initial-values';

const useStyles = makeStyles((theme) => ({
    compareButtonContainer: {
        padding: theme.spacing(3, 0),
    }
}));


export const CompareButton = ({onSetBestValue = noop, itemsCount, onAddItem = noop}) => {
    const classes = useStyles();
    return (
        <div className={classes.compareButtonContainer}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        onClick={onSetBestValue}
                        startIcon={<CompareArrowsIcon />}
                    >
                        Compare {itemsCount}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        variant="contained"
                        disabled={itemsCount >= MAX_ITEMS}
                        onClick={onAddItem}
                    >
                        Add (max. {MAX_ITEMS}), now {itemsCount}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
