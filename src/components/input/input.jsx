import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl/FormControl";

export const Input = ({changeHandler, index, ...rest}) => {
    return (
        <FormControl fullWidth={true}>
            <TextField
                autoComplete="off"
                onChange={(event) => changeHandler(event, index)}
                {...rest}
            />
        </FormControl>
    )
};
