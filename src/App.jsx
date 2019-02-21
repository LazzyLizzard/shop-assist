import React, {Component} from 'react';
import {get} from 'lodash';
import {DEFAULT_DATA} from './initial-values';
import {PriceItem, MeasuresList, Header} from './components';
import {formula} from './utils';
import {measures} from './measures';

const MAX_ITEMS = 10;
const DEFAULT_MEASURE_KEY = 'WEIGHT';

export class App extends Component {
    state = {
        compareData: [DEFAULT_DATA],
        measure: {
            name: null,
            standard: null,
            itemName: null
        }
    };

    addItem = () => this.setState((state) => {
        return {
            compareData: [
                ...state.compareData,
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
        this.setState((state) => {
            const {compareData} = state;
            // https://stackoverflow.com/a/49502115
            compareData[index] = {
                ...compareData[index],
                [name]: value
            };
            return {compareData};
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

    render() {
        const {compareData} = this.state;
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
                        compareData.map((item, index) => {
                                // console.log(item);
                                return (
                                    <PriceItem
                                        key={index}
                                        props={item}
                                        index={index}
                                        changeHandler={this.changeHandler}
                                        allowDelete={compareData.length > 1}
                                        removeHandler={this.removeItem}
                                        measureKey={DEFAULT_MEASURE_KEY}
                                        measure={this.state.measure}
                                    />)
                            }
                        )
                    }
                </div>
                <div>
                    <button type="button" onClick={() => formula(compareData)}>Compare</button>
                </div>
            </div>
        );
    }
}


