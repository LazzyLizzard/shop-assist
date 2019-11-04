import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import {red} from '@material-ui/core/colors';

const colors = {
    warnings: red.A100
};

const useStyles = makeStyles((theme) => ({
    root: {
        color: colors.warnings,
        padding: theme.spacing(2, 0)
    }
}));

export const PriceItemErrors = ({errors = []}) => {
    const classes = useStyles();
    return errors.length
        ? (
            <Grid container className={classes.root}>
                <Grid item>Поля с ошибками должны содержать только символы от 1 до 9 и ".", например 125 или 10.4</Grid>
            </Grid>
        )
        : null
};
