import {PRICE, QUANTITY, SNACKBAR_MINIMUM_TWO, SNACKBAR_NOT_FILLED_DATA, UNIT} from "./field-names";

export const MDASH = '\u2014';

export const DEFAULT_COMPARE_DATA = {
    [UNIT]: '-',
    [PRICE]: '',
    [QUANTITY]: ''
};

export const DEFAULT_BEST_VALUES = {
    errors: [],
    minPrice: null
};

export const MAX_ITEMS = 10;

export const AUTO_HIDE_DURATION = 3000;

export const DEFAULT_SNACKBARS = {
    [SNACKBAR_MINIMUM_TWO]: false,
    [SNACKBAR_NOT_FILLED_DATA]: false
};
