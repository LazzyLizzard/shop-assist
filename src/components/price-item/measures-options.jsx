import React from 'react';
import {get} from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import {MEASURES} from '../../constants/measures';

export const MeasuresOptions = ({measureKey, addEmpty}) => {
    const itemsGroup = MEASURES.find(measureItemGroup => measureItemGroup.key === measureKey);
    return [
        ...addEmpty ? [<MenuItem value="-" key={'-'}>- не выбрано -</MenuItem>] : [],
        ...get(itemsGroup, 'items', []).map(measureItem =>
            (
                <MenuItem
                    key={measureItem.itemName}
                    value={measureItem.factor}
                >
                    {measureItem.itemName} ({measureItem.factor})
                </MenuItem>
            ))
    ]
};
