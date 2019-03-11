import React, {Component} from 'react';
import {get, isEqual} from 'lodash';
import {DEFAULT_DATA} from './constants/initial-values';
import {measures} from './constants/measures';
import {BEST_VALUES_INDEXES, COMPARE_DATA} from './constants/field-names';
import {Header, MeasuresList, PriceItem} from './components';
import {calculatePricePerStandardValue, formula} from './utils';


const MAX_ITEMS = 10;
const DEFAULT_MEASURE_KEY = 'WEIGHT';

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
        // this.setState(() => ({
        //     measure: measureItems.items.find(item => get(item, 'default') === true)
        // }))
        const m = measures.find(item => item.key === DEFAULT_MEASURE_KEY);
        this.setState(() => {
            return {
                measure: {
                    name: m.name,
                    standard: m.items[0].factor,
                    itemName: m.items[0].itemName
                }
            }
        })

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('t', this.state[COMPARE_DATA], 'p', prevState[COMPARE_DATA]);
        console.log('CDU');
        if (!isEqual(prevState[COMPARE_DATA], this.state[COMPARE_DATA])) {
            console.log('AAA');
            this.setState(() => ({[BEST_VALUES_INDEXES]: []}))
        }
    }


    render() {
        const {compareData} = this.state;
        console.log(compareData);
        return (
            <div>
                <Header />
                <div>
                    <MeasuresList measures={measures} />
                </div>
                <div>
                    now: {compareData.length},
                    <button
                        type="button"
                        disabled={compareData.length >= MAX_ITEMS}
                        onClick={this.addItem}>
                        Add (max. {MAX_ITEMS})
                    </button>
                </div>
                <div>
                    {/* TODO [sf] 03.02.2019 use other key */}
                    {
                        compareData.map((item, index) =>
                            (
                                <PriceItem
                                    key={index}
                                    props={item}
                                    index={index}
                                    changeHandler={this.changeHandler}
                                    allowDelete={compareData.length > 1}
                                    removeHandler={this.removeItem}
                                    measureKey={DEFAULT_MEASURE_KEY}
                                    measure={this.state.measure}
                                    bestValues={this.state[BEST_VALUES_INDEXES]}
                                />)
                        )
                    }
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => this.setState(() => {
                            return {
                                [BEST_VALUES_INDEXES]: formula(compareData)
                            }
                        })}
                    >
                        Compare
                    </button>
                </div>
            </div>
        );
    }
}


