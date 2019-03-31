import React from 'react';
import Grid from '@material-ui/core/Grid';
import './header.scss';

export const Header = ({measureText = '...'}) => (
    <Grid container spacing={0}>
        <Grid item xs={12}>
            <div className="header">Shop assist / {measureText}</div>
        </Grid>
    </Grid>
);
