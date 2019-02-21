import React from 'react';

export const Input = ({changeHandler, index, ...rest}) => {
    return (
        <input
            type="text"
            autoComplete="off"
            onChange={(event) => changeHandler(event, index)}
            {...rest}
        />
    )
};
