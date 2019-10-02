import React, {Component} from 'react';
import {get, isEqual} from 'lodash';
import {Button, Container, Grid} from '@material-ui/core';
import {DEFAULT_COMPARE_DATA} from './constants/initial-values';
import {MEASURES} from './constants/measures';
import {BEST_VALUES_INDEXES, COMPARE_DATA, MEASURE} from './constants/field-names';
import {CommonWrapper, Header, MeasuresList, PriceItem} from './components';
import {fl} from "./utils";

const MAX_ITEMS = 10;
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
        [BEST_VALUES_INDEXES]: []
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
            <Container maxWidth={false} root>
                <Header
                    measureText={measure.name}
                />
                <CommonWrapper>
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <MeasuresList
                                measures={MEASURES}
                                keyWord={measure.keyWord}
                                changeMeasureHandler={this.changeMeasureHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="button"
                                variant="contained"
                                disabled={compareData.length >= MAX_ITEMS}
                                onClick={this.addItem}>
                                Add (max. {MAX_ITEMS}), now {compareData.length}
                            </Button>
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
                    />

                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={() => this.setState({
                                    [BEST_VALUES_INDEXES]: fl(compareData, this.state.measure.standard)
                                })}
                            >
                                Compare
                            </Button>
                        </Grid>
                    </Grid>
                </CommonWrapper>
            </Container>
        );
    }
}
