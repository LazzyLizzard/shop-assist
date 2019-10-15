export const MEASURE_KEY_WEIGHT = 'WEIGHT';
export const MEASURE_KEY_VOLUME = 'VOLUME';

export const MEASURES = [
    {
        name: 'Weight',
        key: MEASURE_KEY_WEIGHT,
        items: [
            {
                itemName: 'Kg',
                factor: 1,
                default: true
            },
            {
                itemName: 'gram',
                factor: 1000
            },
            {
                itemName: 'oz',
                factor: 35.274
            }
        ]
    },
    {
        name: 'Volume',
        key: MEASURE_KEY_VOLUME,
        items: [
            {
                itemName: 'Liter',
                factor: 1,
                default: true
            },
            {
                itemName: 'ccm',
                factor: 1000
            }
        ]
    }
];
