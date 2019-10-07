import {min} from 'lodash';
import {MDASH} from './constants/initial-values';
import {PRICE, QUANTITY, UNIT} from './constants/field-names';

export const fl = (values = [], standard) => {
    // single set of data cannot be compared
    if (values.length === 1) {
        return [];
    }
    const allPricesPerStandard = values.map(item => calculatePricePerStandardValue({
        [UNIT]: item.unit,
        standard,
        [PRICE]: item.price,
        [QUANTITY]: item.quantity
    }));
    // TODO [sf] 04-Oct-19 foresee a situation when not all items are filled and raise a <Snackbar />
    // if (allPricesPerStandard.some(item => isNaN(item) )) {
    //     return [];
    // }
    const minVal = min(allPricesPerStandard);
    return allPricesPerStandard.reduce(
        (acc, item, index) => item === minVal
            ? [...acc, index]
            : acc, []
    )
};

export const calculatePricePerStandardValue = ({unit, standard, price, quantity}) => {
    const result = Number(unit) * Number(price) / (Number(quantity) / Number(standard));
    return isNaN(result) || !result ? MDASH : Math.round(result);
};
