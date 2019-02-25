import React from 'react';

export const ButtonDelete = ({text, ...rest}) => {
    return (
        <button
            {...rest}
        >
            {text}
        </button>
    )
};
