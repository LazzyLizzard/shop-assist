import React, {Component} from 'react';
import {get, isEqual} from 'lodash';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {DEFAULT_DATA} from './constants/initial-values';
import {measures} from './constants/measures';
import {BEST_VALUES_INDEXES, COMPARE_DATA} from './constants/field-names';
import {Header, MeasuresList, PriceItem} from './components';
import {calculatePricePerStandardValue, formula} from './utils';

const MAX_ITEMS = 10;
const DEFAULT_MEASURE_KEY = 'WEIGHT';

const setMeasure = (measureKey) => {
    const measureObject = measures.find(object => object.key === measureKey);
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
        [COMPARE_DATA]: [DEFAULT_DATA],
        measure: {
            name: null,
            standard: null,
            itemName: null
        },
        [BEST_VALUES_INDEXES]: []
    };

    addItem = () => this.setState((state) => {
        return {
            [COMPARE_DATA]: [
                ...state[COMPARE_DATA],
                DEFAULT_DATA,
            ]
        }
    });

    removeItem = index => {
        this.setState((state) => {
            const {compareData: data} = state;
            return {
                compareData: data.filter((_, idx) => index !== idx)
            }
        });

    };

    changeHandler = (event, index) => {
        const {name, value} = event.target;
        this.setState(({compareData}) => {
            // https://stackoverflow.com/a/49502115
            // shallow copies
            const item = get(compareData, `[${index}]`, {});    // object
            return {
                compareData: [
                    ...compareData.slice(0, index),
                    {
                        ...item,
                        [name]: value
                    },
                    ...compareData.slice(index + 1, compareData.length)
                ]
            }
        }, () => {
            const {compareData} = this.state;
            const item = get(compareData, `[${index}]`, {});    // object
            const r = calculatePricePerStandardValue({
                unit: compareData[index].unit,
                standard: this.state.measure.standard,
                price: compareData[index].price,
                quantity: compareData[index].quantity,
                per: this.state.measure.itemName
            });

            this.setState(() => {
                return {
                    compareData: [
                        ...compareData.slice(0, index),
                        {
                            ...item,
                            r
                        },
                        ...compareData.slice(index + 1, compareData.length)
                    ]
                }
            });
        })
    };

    componentDidMount() {
        this.setState(() => {
            return {
                measure: setMeasure(DEFAULT_MEASURE_KEY)
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('t', this.state[COMPARE_DATA], 'p', prevState[COMPARE_DATA]);
        console.log('CDU');
        if (!isEqual(prevState[COMPARE_DATA], this.state[COMPARE_DATA])) {
            // TODO [sf] 12.03.2019 use debounce https://stackoverflow.com/a/48046243/3042031
            this.setState(() => ({
                [BEST_VALUES_INDEXES]: []
            }))
        }
    }

    render() {
        const {compareData, measure} = this.state;
        return (
            <React.Fragment>
                <Header
                    measureText={measure.name}
                />
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                    <MeasuresList
                        measures={measures}
                        keyWord={measure.keyWord}
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

                {/* TODO [sf] 03.02.2019 use other key */}

                <PriceItem
                    compareData={compareData}
                    changeHandler={this.changeHandler}
                    allowDelete={compareData.length > 1}
                    removeHandler={this.removeItem}
                    measureKey={DEFAULT_MEASURE_KEY}
                    measure={measure}
                    bestValues={this.state[BEST_VALUES_INDEXES]}
                />

                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            type="button"
                            color="primary"
                            variant="contained"
                            onClick={() => this.setState(() => ({
                                [BEST_VALUES_INDEXES]: formula(compareData)
                            }))}
                        >
                            Compare
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}


