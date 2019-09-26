import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Input} from '../../components';
import {calculatePricePerStandardValue} from '../../utils';
import {setStyles} from "./utils";
// import {MeasuresOptions} from "./measures-options";
import {MEASURES} from "../../constants/measures";
import MenuItem from "@material-ui/core/MenuItem";
import {get} from "lodash";

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

export const PriceItem = ({
    compareData,
    changeHandler,
    allowDelete,
    removeHandler,
    measureKey,
    measure,
    bestValues,
    standard
}) => {
    const {itemName} = measure;
    return (
        compareData.map((item, index) => (
            <Grid
                container
                spacing={16}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                style={setStyles(bestValues, index)}
                key={index}
            >
                <Grid item xs={6} sm={2}>
                    <Input
                        placeholder="к-во"
                        label="qty"
                        name="quantity"
                        value={item.quantity}
                        index={index}
                        changeHandler={changeHandler}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <FormControl>
                        <InputLabel htmlFor="unit">Unit</InputLabel>
                        <Select
                            placeholder="measure"
                            label="Unit"
                            value={item.unit}
                            onChange={(event) => changeHandler(event, index)}
                            inputProps={{
                                name: 'unit',
                                id: 'unit'
                            }}
                        >
                            {getMeasuresOptions(measureKey, true)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <Input
                        placeholder="price"
                        label="Price"
                        name="price"
                        value={item.price}
                        index={index}
                        changeHandler={changeHandler}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>

                    <TextField
                        disabled
                        style={{fontWeight: 'bold'}}
                        id="r"
                        label={`RUB/${itemName}`}
                        // value={item.r}
                        value={calculatePricePerStandardValue({
                            unit: item.unit,
                            standard,
                            price: item.price,
                            quantity: item.quantity
                        })}
                    />
                </Grid>
                <Grid item xs={3} sm={2}>
                    {allowDelete &&
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            removeHandler(index)
                        }}
                    >
                        Delete {index}
                    </Button>
                    }
                </Grid>
            </Grid>
        ))
    )
};
