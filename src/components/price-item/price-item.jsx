import React from 'react';
import {get} from 'lodash';
import {Input} from '../input';
import {measures} from '../../constants/measures';
import './price-item.scss'


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

export const PriceItem = ({props, index, changeHandler, allowDelete, removeHandler, measureKey, measure, bestValues}) => {
    const {itemName} = measure;
    return (
        <div className="price-item">
            <div className="price-item__mark">
                {bestValues.includes(index) && <div>**</div>}
            </div>
            <div className="price-item__quantity">
                <Input
                    placeholder="к-во"
                    name="quantity"
                    value={props.units}
                    index={index}
                    changeHandler={changeHandler}
                />
            </div>
            <div className="price-item__unit">
                <select
                    style={{width: '100%'}}
                    name="unit"
                    onChange={(event) => changeHandler(event, index)}
                >
                    <option value="-">- не выбрано -</option>
                    {getMeasuresOptions(measureKey)}
                </select>
            </div>
            <div className="price-item__price">
                <Input
                    placeholder="price"
                    name="price"
                    value={props.price}
                    index={index}
                    changeHandler={changeHandler}
                />
            </div>
            <div className="price-item__result">
                {props.r} RUB/{itemName}
            </div>
            <div className="price-item__button">
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
