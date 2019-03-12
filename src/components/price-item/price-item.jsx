import React from 'react';
import {get} from 'lodash';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Input} from '../input';
import {measures} from '../../constants/measures';
// import './price-item.scss'

// TODO [sf] 10.02.2019 make component
const getMeasuresOptions = (measureKey) => {
    const itemsGroup = measures.find(measureItemGroup => measureItemGroup.key === measureKey);
    return get(itemsGroup, 'items', []).map(measureItem =>
        (
            <MenuItem
                key={measureItem.itemName}
                value={measureItem.factor}
            >
                {measureItem.itemName} ({measureItem.factor})
            </MenuItem>
        ))
};

export const PriceItem = ({props, index, changeHandler, allowDelete, removeHandler, measureKey, measure, bestValues}) => {
    const {itemName} = measure;
    return (
        <Grid
            container
            spacing={24}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{padding: '0 40px'}}
        >
            <Grid item xs={1} sm={1} xl={1}>
                {bestValues.includes(index) && <div>**</div>}
            </Grid>

            <Grid item xs={6} sm={2}>
                <Input
                    placeholder="к-во"
                    label="qty"
                    name="quantity"
                    value={props.units}
                    index={index}
                    changeHandler={changeHandler}
                />
            </Grid>
            <Grid item xs={3} sm={2}>
                <FormControl>
                    <InputLabel htmlFor="unit">Unit</InputLabel>
                    <Select
                        margin="normal"
                        placeholder="measure"
                        label="Unit"
                        value={props.unit}
                        onChange={(event) => changeHandler(event, index)}
                        inputProps={{
                            name: 'unit',
                            id: 'unit'
                        }}
                    >
                        <MenuItem value="-">- не выбрано -</MenuItem>
                        {getMeasuresOptions(measureKey)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3} sm={2}>
                <Input
                    placeholder="price"
                    label="Price"
                    name="price"
                    value={props.price}
                    index={index}
                    changeHandler={changeHandler}
                />
            </Grid>
            <Grid item xs={3} sm={2}>
                {props.r} RUB/{itemName}
            </Grid>
            <Grid item xs={3} sm={2}>
                {allowDelete &&
                <button
                    type="button"
                    onClick={() => {
                        removeHandler(index)
                    }}
                >
                    X
                </button>
                }
            </Grid>
        </Grid>
    )
};
