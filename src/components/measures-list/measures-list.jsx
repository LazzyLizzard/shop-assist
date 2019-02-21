import React from 'react';

export const MeasuresList = ({measures}) => measures.map(item => (
    <span style={{margin: '0 20px 0 0'}}>{item.name}</span>
));
