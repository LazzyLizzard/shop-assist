import {min} from 'lodash';
import {MDASH} from './constants/initial-values';

export const fl = (values = [], standard) => {
    const allPricesPerStandard = values.map(item => calculatePricePerStandardValue({
        unit: item.unit,
        standard,
        price: item.price,
        quantity: item.quantity
    }));
    const minVal = min(allPricesPerStandard);
    return allPricesPerStandard.reduce((acc, item, index) => item === minVal ? [...acc, index] : acc, [])
};

export const calculatePricePerStandardValue = ({unit, standard, price, quantity}) => {
    const result = Number(unit) * Number(price) / (Number(quantity) / Number(standard));
    return isNaN(result) || !result ? MDASH : Math.round(result);
};

// TODO [sf] 10.02.2019 curry for getMeasuresOptions
export const getMeasureStandard = (measureData, measureKey) => {
    const x = measureData.items.find(item => item.standard === true);
    return x.factor;
};
