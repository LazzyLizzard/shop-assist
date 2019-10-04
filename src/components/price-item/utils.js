export const setStyles = (bestValues = [], index) => ({
    ...bestValues.includes(index) ? {background: '#CAFFCA'} : {},
    padding: 'none'
});

