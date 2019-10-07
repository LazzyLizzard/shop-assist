import React, {Component} from 'react';
import {get, isEqual} from 'lodash';
import {Container, Drawer, Grid, Snackbar} from '@material-ui/core';
import {DEFAULT_COMPARE_DATA} from './constants/initial-values';
import {MEASURES} from './constants/measures';
import {BEST_VALUES_INDEXES, COMPARE_DATA, DISPLAY_SNACKBAR, MEASURE, SIDEBAR_VISIBLE} from './constants/field-names';
import {CompareButton, Header, MeasuresList, PriceItem} from './components';
import {fl} from './utils';

const DEFAULT_MEASURE_KEY = 'WEIGHT';

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

export class App extends Component {
    state = {
        [COMPARE_DATA]: [DEFAULT_COMPARE_DATA],
        [MEASURE]: setMeasure(DEFAULT_MEASURE_KEY),
        [BEST_VALUES_INDEXES]: [],
        [SIDEBAR_VISIBLE]: false,
        [DISPLAY_SNACKBAR]: false
    };

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
        this.setState(() => ({
            [BEST_VALUES_INDEXES]: fl(this.state[COMPARE_DATA], this.state.measure.standard),
            [DISPLAY_SNACKBAR]: this.state[COMPARE_DATA].length === 1
        }));
    };

    componentDidUpdate(_, prevState) {
        if (!isEqual(prevState[COMPARE_DATA], this.state[COMPARE_DATA])) {
            // TODO [sf] 12.03.2019 use debounce https://stackoverflow.com/a/48046243/3042031
            this.setState({
                [BEST_VALUES_INDEXES]: []
            })
        }
    }

    render() {
        const {compareData, measure} = this.state;
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
                    />
                </Drawer>
                <Container maxWidth={false}>
                    <Snackbar
                        open={this.state[DISPLAY_SNACKBAR]}
                        message={<span id="message-id">Для сравнения необходимо не менее 2 товаров</span>}
                        autoHideDuration={2000}
                        onClose={() => this.setState({
                            [DISPLAY_SNACKBAR]: false
                        })}
                    />
                    <CompareButton
                        onSetBestValue={this.setBestValue}
                        itemsCount={compareData.length}
                        onAddItem={this.addItem}
                    />
                    <Grid container>
                        <Grid item xs={6}>
                            <MeasuresList
                                measures={MEASURES}
                                keyWord={measure.keyWord}
                                changeMeasureHandler={this.changeMeasureHandler}
                            />
                        </Grid>

                    </Grid>

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
            </React.Fragment>
        );
    }
}

export default App;
