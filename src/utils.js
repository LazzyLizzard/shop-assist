import {min} from 'lodash';
import {DEFAULT_BEST_VALUES, MDASH} from './constants/initial-values';
import {PRICE, QUANTITY, UNIT} from './constants/field-names';

export const processCompare = (values = [], standard) => {
    // single set of data cannot be compared
    if (values.length === 1) {
        return DEFAULT_BEST_VALUES;
    }

    const allPricesPerStandard = values.map((item, index) => {
            const value = calculatePricePerStandardValue({
                [UNIT]: item.unit,
                standard,
                [PRICE]: item.price,
                [QUANTITY]: item.quantity
            });
            return ({
                index,
                value,
                error: isNaN(value)
            });
        }
    );

    const minimumValue = min(
        allPricesPerStandard
            .filter(item => !item.error)
            .map(item => item.value)
    );

    return {
        minPrice: minimumValue || null,
        errors: allPricesPerStandard
            .filter(item => item.error)
            .map(item => item.index)
    }
};


export const calculatePricePerStandardValue = ({unit, standard, price, quantity}) => {
    const result = Number(unit) * Number(price) / (Number(quantity) / Number(standard));
    return isNaN(result) || !result ? MDASH : Math.round(result);
};
