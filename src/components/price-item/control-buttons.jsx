import React from 'react';
import {noop} from 'lodash';
import {Grid, makeStyles} from '@material-ui/core';
import {RemoveButton} from './remove-button';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2, 0, 0, 0),
    },
    // TODO [sf] 14.10.2019 refactor to &-class
    itemRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export const ControlButtons = ({allowDelete, onRemove = noop, onClear = noop}) => {
    const styles = useStyles();
    return (
        <Grid
            container
            className={styles.item}
            spacing={3}
        >
            <Grid
                item
                xs={6}
                className={styles.itemRight}
            >
                <RemoveButton
                    buttonText="Удалить"
                    allowDelete={allowDelete}
                    onRemove={onRemove}
                />
            </Grid>
            <Grid item xs={6}>
                <RemoveButton
                    buttonText="Очистить"
                    allowDelete
                    onRemove={onClear}
                />
            </Grid>
        </Grid>
    );
};
