export const UNIT = 'unit';
export const PRICE = 'price';
export const QUANTITY = 'quantity';

export const SNACKBAR_MINIMUM_TWO = 'snackbarMinimumTwo';
export const SNACKBAR_NOT_FILLED_DATA = 'snackbarNotFilledData';

export const SNACKBARS_LIST = [
    {
        key: SNACKBAR_MINIMUM_TWO,
        text: 'Для сравнения необходимо не менее 2 позиций',
    },
    {
        key: SNACKBAR_NOT_FILLED_DATA,
        getErrorText: (errors) => `${errors.length} полей не заполнено`
    }
];

export const SNACKBAR_POSITION = {
    vertical: 'bottom',
    horizontal: 'right'
};
