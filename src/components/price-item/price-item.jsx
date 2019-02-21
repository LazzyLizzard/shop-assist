import React from 'react';
import {get} from 'lodash';
import {calculatePricePerStandardValue} from '../../utils';
import {Input} from '../input';
import {measures} from '../../measures';


// TODO [sf] 10.02.2019 make component
const getMeasuresOptions = (measureKey) => {
    const itemsGroup = measures.find(measureItemGroup => measureItemGroup.key === measureKey);
    return get(itemsGroup, 'items', []).map(measureItem =>
        (
            <option
                key={measureItem.itemName}
                value={measureItem.factor}
            >
                {measureItem.itemName} ({measureItem.factor})
            </option>
        ))
};

export const PriceItem = ({props, index, changeHandler, allowDelete, removeHandler, measureKey, measure}) => {
    console.log(props);

    return (
        <div>
            <div>
                <Input
                    placeholder="price"
                    name="price"
                    value={props.price}
                    index={index}
                    changeHandler={changeHandler}
                />
                <select
                    name="unit"
                    onChange={(event) => changeHandler(event, index)}
                >
                    <option value="-">- не выбрано -</option>
                    {getMeasuresOptions(measureKey)}
                </select>
                <Input
                    placeholder="к-во"
                    name="quantity"
                    value={props.units}
                    index={index}
                    changeHandler={changeHandler}
                />
                {/*<Input name="result" value={props.result} disabled />*/}
                v: {
                calculatePricePerStandardValue({
                    ...props,
                    standard: measure.standard
                })}
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
            </div>
        </div>
    )
};
