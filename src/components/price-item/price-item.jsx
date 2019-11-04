import React from 'react';
import {get} from 'lodash';
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from '@material-ui/core';
import {amber, green} from '@material-ui/core/colors';

import {PRICE, QUANTITY} from '../../constants/field-names';
import {MEASURES} from '../../constants/measures';
import {Input, PriceItemErrors} from '../../components';
import {ControlButtons} from './control-buttons';
import {calculatePricePerStandardValue} from '../../utils';

const reg = /^[1-9]\d*(\.\d+)?$/;
// const reg = /^\d+$/;
// const reg = /^[0-9.]+$/;

const checkValue = (value = '') => {
    if (value.trim() === '') {
        return false;
    }
    return !reg.test(value);
};

const colors = {
    greenBest: green["300"],
    warnings: amber.A100
};

const INPUT_PROPS = {
    name: 'unit'
};

// https://github.com/mui-org/material-ui/issues/9573
const getMeasuresOptions = (measureKey, addEmpty) => {
    const itemsGroup = MEASURES.find(measureItemGroup => measureItemGroup.key === measureKey);
    return [
        ...addEmpty ? [<MenuItem value="-" key={'-'}>- не выбрано -</MenuItem>] : [],
        ...get(itemsGroup, 'items', []).map(measureItem =>
            (
                <MenuItem
                    key={measureItem.itemName}
                    value={measureItem.factor}
                >
                    {measureItem.itemName} ({measureItem.factor})
                </MenuItem>
            ))
    ]
};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3, 2),
        marginBottom: theme.spacing(3),
    },
    paperActive: {
        background: colors.greenBest
    },
    paperError: {
        background: colors.warnings
    }
}));

export const PriceItem = ({
    compareData = [],
    changeHandler,
    allowDelete,
    removeHandler,
    measureKey,
    measure,
    bestValues,
    standard,
    resetItemHandler
}) => {
    const classes = useStyles();
    const {itemName} = measure;

    // TODO [sf] 03.10.2019 fix adding class by @classNames
    return (
        compareData.map((item, index) => {
            const {unit, price, quantity} = item;
            const pricePerStandard = calculatePricePerStandardValue({
                unit,
                standard,
                price,
                quantity
            });
            const itemErrors = [
                ...checkValue(item[QUANTITY]) ? [QUANTITY] : [],
                ...checkValue(item[PRICE]) ? [PRICE] : []
            ];

            return (
                <Paper
                    className={[
                        classes.paper,
                        ...[bestValues.errors.includes(index) ? classes.paperError : ''],
                        ...[pricePerStandard === bestValues.minPrice ? classes.paperActive : '']
                    ].join(' ')}
                    // className={classes.paper}
                    key={index}
                    elevation={3}
                >
                    <Grid container spacing={3}>
                        <Grid item lg={10} xs={10}>
                            <Grid
                                container
                                spacing={3}
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid item xs={4} md={4} sm={4}>
                                    <Input
                                        error={itemErrors.includes(QUANTITY)}
                                        placeholder="Количество"
                                        label="Количество"
                                        name={QUANTITY}
                                        value={item[QUANTITY]}
                                        index={index}
                                        changeHandler={changeHandler}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={2} sm={4}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor="unit">Unit</InputLabel>
                                        <Select
                                            fullWidth={true}
                                            label="Unit"
                                            value={item.unit}
                                            onChange={(event) => changeHandler(event, index)}
                                            inputProps={INPUT_PROPS}
                                        >
                                            {getMeasuresOptions(measureKey, true)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} md={4} sm={4}>
                                    <Input
                                        error={itemErrors.includes(PRICE)}
                                        placeholder="price"
                                        label="Price"
                                        name={PRICE}
                                        value={item[PRICE]}
                                        index={index}
                                        changeHandler={changeHandler}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={2} xs={2}>
                            <TextField
                                disabled
                                label={`RUB/${itemName}`}
                                value={pricePerStandard}
                            />
                        </Grid>
                    </Grid>
                    <PriceItemErrors errors={itemErrors} />
                    <ControlButtons
                        allowDelete={allowDelete}
                        onRemove={() => removeHandler(index)}
                        onClear={() => resetItemHandler(index)}
                    />
                </Paper>
            );
        })
    )
};
