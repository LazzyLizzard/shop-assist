import React from 'react';
import Grid from '@material-ui/core/Grid';
import {COLS_SPACING} from '../../constants/layout';
import {CommonWrapper} from "../common-wrapper";
import './header.scss';

export const Header = ({measureText = '...'}) => (
    <CommonWrapper>
        <Grid container spacing={COLS_SPACING}>
            <Grid item xs={12}>
                <div className="header">Shop assist / {measureText}</div>
            </Grid>
        </Grid>
    </CommonWrapper>
);
