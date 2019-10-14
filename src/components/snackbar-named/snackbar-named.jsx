import React from 'react';
import {Snackbar} from "@material-ui/core";

export const SnackbarNamed = ({snackbarName, text, onClose, isOpen}) => (
    <Snackbar
        open={isOpen}
        message={<span id="message-id">{text}</span>}
        autoHideDuration={2000}
        onClose={onClose}
    />
);
