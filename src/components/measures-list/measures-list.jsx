import React from 'react';
import {noop} from 'lodash';

export const MeasuresList = ({measures, keyWord, changeMeasureHandler}) => measures.map(item => (
    <span
        key={item.key}
        onClick={() => item.key === keyWord ? noop() : changeMeasureHandler(item.key)}
        style={{
        ...{marginRight: '20px'},
        ...item.key === keyWord ? {fontWeight: 'bold'} : {}
    }}>{item.name}</span>
));
