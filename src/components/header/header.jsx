import React from 'react';
import Grid from '@material-ui/core/Grid';
import './header.scss';

export const Header = () => (
    <Grid container spacing={24}>
        <Grid item xs={12}>
            <div className="header">Shop assist</div>
        </Grid>
    </Grid>
);
