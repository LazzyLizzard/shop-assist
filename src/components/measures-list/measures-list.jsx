import React from 'react';
import {noop} from 'lodash';
import {Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {MEASURE_KEY_VOLUME, MEASURE_KEY_WEIGHT} from '../../constants/measures';

const ICONS = {
    [MEASURE_KEY_WEIGHT]: <FitnessCenterIcon/>,
    [MEASURE_KEY_VOLUME]: <LocalDrinkIcon/>
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const MeasuresList = ({measures, keyWord, changeMeasureHandler}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List>
                {measures.map((item, index) => (
                    <ListItem
                        button
                        key={item.key}
                        selected={item.key === keyWord}
                        onClick={() => item.key === keyWord ? noop() : changeMeasureHandler(item.key)}
                    >
                        <ListItemIcon>
                            {ICONS[item.key]}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );
};


