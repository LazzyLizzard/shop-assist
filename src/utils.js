import {minBy, get} from 'lodash';

export const formula = (values = []) => {
    if (values.length) {
        console.log(values);
        // const minVal = minBy(values, 'r');
        const minValObject = minBy(values, (item) => item.r);
        const minVal = get(minValObject, 'r');
        const indexes = values.reduce((acc, item, index) => {
            return item.r === minVal ? [...acc, index] : acc;
        }, []);
        console.log(indexes);
        console.log('x', indexes);
        return indexes;
    }
    return 0;
};

export const calculatePricePerStandardValue = ({unit, standard, price, quantity}) => {
    // console.log('>>> u %s, s %s, p %s, q %s', unit, standard, price, quantity);
    // 1000/цена * вес в граммах
    const result = Number(unit) * Number(price) / (Number(quantity) / Number(standard));
    return isNaN(result) || !result ? '-' : Math.round(result);
};

// TODO [sf] 10.02.2019 curry for getMeasuresOptions
export const getMeasureStandard = (measureData, measureKey) => {
    const x = measureData.items.find(item => item.standard === true);
    return x.factor;
};
