import React from 'react';
import {COLS_SPACING} from '../../constants/layout';

export const CommonWrapper = ({children}) => (
    <div style={{overflow: 'hidden'}}>
        {children}
    </div>
);
