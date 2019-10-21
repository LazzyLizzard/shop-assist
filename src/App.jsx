import React, {Component} from 'react';
import {get, isEqual} from 'lodash';
import {Container, Drawer, Snackbar, withWidth} from '@material-ui/core';
import {DEFAULT_BEST_VALUES, DEFAULT_COMPARE_DATA} from './constants/initial-values';
import {MEASURE_KEY_WEIGHT, MEASURES} from './constants/measures';
import {
    BEST_VALUES_INDEXES,
    COMPARE_DATA,
    DISPLAY_SNACKBARS,
    MEASURE,
    SIDEBAR_VISIBLE,
    SNACKBAR_MINIMUM_TWO,
    SNACKBAR_NOT_FILLED_DATA,
    SNACKBAR_POSITION,
    SNACKBARS_LIST
} from './constants/field-names';
import {CompareButton, Header, MeasuresList, PriceItem} from './components';
import {processCompare} from './utils';

const DEFAULT_MEASURE_KEY = MEASURE_KEY_WEIGHT;

const setMeasure = (measureKey) => {
    const measureObject = MEASURES.find(object => object.key === measureKey);
    const measureItem = measureObject.items.find(item => get(item, 'default') === true);
    return {
        keyWord: measureObject.key,
        name: measureObject.name,
        standard: measureItem.factor,
        itemName: measureItem.itemName
    }
};

class AppClass extends Component {
    state = {
        [COMPARE_DATA]: [DEFAULT_COMPARE_DATA],
        [MEASURE]: setMeasure(DEFAULT_MEASURE_KEY),
        [BEST_VALUES_INDEXES]: DEFAULT_BEST_VALUES,
        [SIDEBAR_VISIBLE]: false,
        [DISPLAY_SNACKBARS]: {
            [SNACKBAR_MINIMUM_TWO]: false,
            [SNACKBAR_NOT_FILLED_DATA]: false
        }
    };

    buildSnackbarsList = (data = []) => data.map(item => (
        <Snackbar
            key={item.key}
            message={item.text}
            autoHideDuration={3000}
            open={this.state[DISPLAY_SNACKBARS][item.key]}
            anchorOrigin={SNACKBAR_POSITION}
            onClose={() => this.setState(({displaySnackBars}) => ({
                [DISPLAY_SNACKBARS]: {
                    ...displaySnackBars,
                    [item.key]: false
                }
            }))}
        />
    ));

    addItem = () => {
        this.setState(({compareData}) => ({
            [COMPARE_DATA]: [
                ...compareData,
                DEFAULT_COMPARE_DATA
            ]
        }));
    };

    removeItem = (index) => {
        this.setState(({compareData}) => ({
            [COMPARE_DATA]: compareData.filter((_, idx) => index !== idx)
        }));

    };

    changeMeasureHandler = (measureKey) => {
        this.setState({
            [MEASURE]: setMeasure(measureKey)
        });
        this.sidebarToggler();
    };

    changeHandler = (event, index) => {
        const {target: {name, value}} = event;
        return this.setState(({compareData}) => {
            // https://stackoverflow.com/a/49502115
            // shallow copies
            const item = get(compareData, `[${index}]`, {});
            return {
                [COMPARE_DATA]: [
                    ...compareData.slice(0, index),
                    {
                        ...item,
                        [name]: value
                    },
                    ...compareData.slice(index + 1, compareData.length)
                ]
            }
        })
    };

    resetItem = (index) => {
        this.setState(({compareData}) => ({
            [COMPARE_DATA]: compareData.map((item, itemIndex) => index === itemIndex ? DEFAULT_COMPARE_DATA : item)
        }))
    };

    sidebarToggler = () => {
        this.setState((prevState) => ({
            [SIDEBAR_VISIBLE]: !prevState[SIDEBAR_VISIBLE]
        }))
    };

    setBestValue = () => {
        const cData = processCompare(this.state[COMPARE_DATA], this.state.measure.standard);
        this.setState({
            [BEST_VALUES_INDEXES]: cData,
            [DISPLAY_SNACKBARS]: {
                [SNACKBAR_MINIMUM_TWO]: this.state[COMPARE_DATA].length === 1,
                [SNACKBAR_NOT_FILLED_DATA]: cData.errors.length > 0
            }
        });
    };

    componentDidUpdate(_, prevState) {
        if (!isEqual(prevState[COMPARE_DATA], this.state[COMPARE_DATA])) {
            // TODO [sf] 12.03.2019 use debounce https://stackoverflow.com/a/48046243/3042031
            this.setState({
                [BEST_VALUES_INDEXES]: DEFAULT_BEST_VALUES
            })
        }
    }

    render() {
        const {compareData, measure} = this.state;
        const {width} = this.props;
        return (
            <React.Fragment>
                <Header
                    measureText={measure.name}
                    sidebarToggler={this.sidebarToggler}
                />
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={this.state[SIDEBAR_VISIBLE]}
                    onClose={this.sidebarToggler}
                >
                    <MeasuresList
                        measures={MEASURES}
                        keyWord={measure.keyWord}
                        changeMeasureHandler={this.changeMeasureHandler}
                        onClose={this.sidebarToggler}
                    />
                </Drawer>
                <Container maxWidth={false}>

                    {this.buildSnackbarsList(SNACKBARS_LIST)}

                    <CompareButton
                        onSetBestValue={this.setBestValue}
                        itemsCount={compareData.length}
                        onAddItem={this.addItem}
                    />
                    <div>{width}</div>

                    <PriceItem
                        compareData={compareData}
                        changeHandler={this.changeHandler}
                        allowDelete={compareData.length > 1}
                        removeHandler={this.removeItem}
                        measureKey={measure.keyWord}
                        measure={measure}
                        bestValues={this.state[BEST_VALUES_INDEXES]}
                        standard={this.state.measure.standard}
                        resetItemHandler={this.resetItem}
                    />

                </Container>
            </React.Fragment>);
    }
}

export const App = withWidth()(AppClass);
