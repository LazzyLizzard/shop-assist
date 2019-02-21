import {minBy} from 'lodash';

export const formula = (values) => {
    console.log(values);
    const x = minBy(values, 'price');
    console.log('x', x);
    return x;
};

export const calculatePricePerStandardValue = ({unit, standard, price, quantity, per}) => {
    // console.log('>>> u %s, s %s, p %s, q %s', unit, standard, price, quantity);

    // 1000/цена * вес в граммах

    const result = Number(unit) * Number(price) / (Number(quantity) / Number(standard));
    return isNaN(result) ? `per ${per}` : Math.round(result);
};

// TODO [sf] 10.02.2019 curry for getMeasuresOptions
export const getMeasureStandard = (measureData, measureKey) => {
    const x = measureData.items.find(item => item.standard === true);
    return x.factor;
};