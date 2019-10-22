import React, {useEffect, useState} from 'react';
import {get} from 'lodash';
import {Container, Drawer, Snackbar, withWidth} from '@material-ui/core';
import {DEFAULT_BEST_VALUES, DEFAULT_COMPARE_DATA} from './constants/initial-values';
import {MEASURE_KEY_WEIGHT, MEASURES} from './constants/measures';
import {
    DISPLAY_SNACKBARS,
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

const AppClass = ({width}) => {

    const [compareData, setCompareData] = useState([DEFAULT_COMPARE_DATA]);
    const [measure, setMeasureKey] = useState(setMeasure(DEFAULT_MEASURE_KEY));
    const [bestValuesIndexes, setBestIndexes] = useState(DEFAULT_BEST_VALUES);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [displaySnackBars, setSnackbars] = useState({
        [DISPLAY_SNACKBARS]: {
            [SNACKBAR_MINIMUM_TWO]: false,
            [SNACKBAR_NOT_FILLED_DATA]: false
        }
    });

    const addItem = () => {
        setCompareData([
            ...compareData,
            DEFAULT_COMPARE_DATA
        ]);
    };

    const removeItem = (index) => {
        setCompareData(compareData.filter((_, idx) => index !== idx));
    };

    const buildSnackbarsList = (data = []) => data.map(item => {
        const {displaySnackBars: snacksData} = displaySnackBars;
        return (
            <Snackbar
                key={item.key}
                message={item.text}
                autoHideDuration={3000}
                open={snacksData[item.key]}
                anchorOrigin={SNACKBAR_POSITION}
                onClose={() => setSnackbars({
                    [DISPLAY_SNACKBARS]: {
                        ...snacksData,
                        [item.key]: false
                    }
                })}
            />
        );
    });
    const changeMeasureHandler = (measureKey) => {
        setMeasureKey(setMeasure(measureKey));
        toggleSidebar();
    };

    const changeHandler = (event, index) => {
        const {target: {name, value}} = event;
        const item = get(compareData, `[${index}]`, {});
        const newData = [
            ...compareData.slice(0, index),
            {
                ...item,
                [name]: value
            },
            ...compareData.slice(index + 1, compareData.length)
        ];
        setCompareData(newData)
    };

    const resetItem = (index) => {
        setCompareData(compareData
            .map((item, itemIndex) => index === itemIndex
                ? DEFAULT_COMPARE_DATA :
                item)
        );
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const setBestValue = (prevData) => {
        const cData = processCompare(compareData, measure.standard);
        setBestIndexes(cData);
        setSnackbars({
            [DISPLAY_SNACKBARS]: {
                [SNACKBAR_MINIMUM_TWO]: compareData.length === 1,
                [SNACKBAR_NOT_FILLED_DATA]: cData.errors.length > 0
            }
        });
    };

    useEffect(() => {
        if (bestValuesIndexes.errors.length) {
            setBestIndexes(DEFAULT_BEST_VALUES);
        }
    }, [compareData]);

    return (
        <React.Fragment>
            <Header
                measureText={measure.name}
                sidebarToggler={toggleSidebar}
            />
            <Drawer
                variant="temporary"
                anchor="left"
                open={sidebarVisible}
                onClose={toggleSidebar}
            >
                <MeasuresList
                    measures={MEASURES}
                    keyWord={measure.keyWord}
                    changeMeasureHandler={changeMeasureHandler}
                    onClose={toggleSidebar}
                />
            </Drawer>
            <Container maxWidth={false}>

                {buildSnackbarsList(SNACKBARS_LIST)}

                <CompareButton
                    onSetBestValue={setBestValue}
                    itemsCount={compareData.length}
                    onAddItem={addItem}
                />
                <div>{width}</div>

                <PriceItem
                    compareData={compareData}
                    changeHandler={changeHandler}
                    allowDelete={compareData.length > 1}
                    removeHandler={removeItem}
                    measureKey={measure.keyWord}
                    measure={measure}
                    bestValues={bestValuesIndexes}
                    standard={measure.standard}
                    resetItemHandler={resetItem}
                />

            </Container>
        </React.Fragment>
    );
};

export const App = withWidth()(AppClass);
