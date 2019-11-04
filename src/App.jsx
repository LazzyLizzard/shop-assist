import React, {useEffect, useState} from 'react';
import {get} from 'lodash';
import {Container, Drawer, Snackbar, withWidth} from '@material-ui/core';
import {AUTO_HIDE_DURATION, DEFAULT_BEST_VALUES, DEFAULT_COMPARE_DATA, DEFAULT_SNACKBARS} from './constants/initial-values';
import {MEASURE_KEY_WEIGHT, MEASURES} from './constants/measures';
import {
    SNACKBAR_MINIMUM_TWO,
    SNACKBAR_NOT_FILLED_DATA,
    SNACKBAR_POSITION,
    SNACKBARS_LIST
} from './constants/field-names';
import {TopButtonsBlock, Header, MeasuresList, PriceItem} from './components';
import {processCompare} from './utils';

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
    const [measure, setMeasureKey] = useState(setMeasure(MEASURE_KEY_WEIGHT));
    const [bestValuesIndexes, setBestIndexes] = useState(DEFAULT_BEST_VALUES);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [displaySnackBars, setSnackbars] = useState(DEFAULT_SNACKBARS);

    const addItem = () => {
        setCompareData([
            ...compareData,
            DEFAULT_COMPARE_DATA
        ]);
    };

    const buildSnackbarsList = (snackBars = [], errors = []) => snackBars.map(item => (
        <Snackbar
            key={item.key}
            message={item.getErrorText
                ? item.getErrorText(errors)
                : item.text
            }
            autoHideDuration={AUTO_HIDE_DURATION}
            open={displaySnackBars[item.key]}
            anchorOrigin={SNACKBAR_POSITION}
            onClose={() => setSnackbars({
                ...displaySnackBars,
                [item.key]: false
            })}
        />
    ));

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

    const removeItem = (index) => {
        setSnackbars(DEFAULT_SNACKBARS);
        setTimeout(() => {
            setCompareData(compareData.filter((_, idx) => index !== idx));
        }, 500);
    };

    const resetItem = (index) => {
        setSnackbars(DEFAULT_SNACKBARS);
        setTimeout(() => {
            setCompareData(compareData
                .map((item, itemIndex) => index === itemIndex
                    ? DEFAULT_COMPARE_DATA :
                    item)
            );
        }, 500);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const setBestValue = () => {
        const cData = processCompare(compareData, measure.standard);
        setBestIndexes(cData);
        setSnackbars({
            [SNACKBAR_MINIMUM_TWO]: compareData.length === 1,
            [SNACKBAR_NOT_FILLED_DATA]: cData.errors.length > 0
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

                {buildSnackbarsList(SNACKBARS_LIST, get(bestValuesIndexes, 'errors', []))}

                <TopButtonsBlock
                    itemsCount={compareData.length}
                    onSetBestValue={setBestValue}
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
