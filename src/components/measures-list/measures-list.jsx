import React from 'react';

export const MeasuresList = ({measures, keyWord}) => measures.map(item => (
    <span style={{
        ...{marginRight: '20px'},
        ...item.key === keyWord ? {fontWeight: 'bold'} : {}
    }}>{item.name}</span>
));
