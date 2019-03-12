import React from 'react';
import TextField from '@material-ui/core/TextField';

export const Input = ({changeHandler, index, ...rest}) => {
    return (
        <TextField
            autoComplete="off"
            onChange={(event) => changeHandler(event, index)}
            margin="normal"
            {...rest}
        />
    )
};
