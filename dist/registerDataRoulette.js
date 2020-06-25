import { addons } from '@storybook/addons';
import { SPIN, RESET, SET_LOADING, REFETCH, SET_ITEMS, } from './constants';
import { useEffect } from '@storybook/client-api';
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events';
import DataRouletteStore from './DataRouletteStore';
import { shuffle } from 'lodash';
var dataRouletteStore = new DataRouletteStore();
function setPanelData(timestamp) {
    if (timestamp === void 0) { timestamp = +new Date(); }
    var channel = addons.getChannel();
    channel.emit(SET_ITEMS, { data: dataRouletteStore.getAll(), timestamp: timestamp });
    channel.emit(SET_LOADING, dataRouletteStore.isLoading);
}
function forceReRender() {
    addons.getChannel().emit(FORCE_RE_RENDER);
}
export var dataRoulette = function (key, defaultValue) {
    var hasSpun = dataRouletteStore.hasSpun, isLoading = dataRouletteStore.isLoading, data = dataRouletteStore.data;
    if (hasSpun && !isLoading) {
        var shuffledData = Object.keys(data).map(function (dataKey) {
            return shuffle(data[dataKey]);
        });
        var relevantSet = shuffledData.find(function (set) {
            return set.find(function (item) { return !!item[key]; });
        });
        if (relevantSet === null || relevantSet === void 0 ? void 0 : relevantSet.length) {
            var value = relevantSet.filter(function (item) { return !!item[key]; })[0][key];
            dataRouletteStore.set(defaultValue, value);
            return value;
        }
        else {
            dataRouletteStore.set(defaultValue, defaultValue);
            return defaultValue;
        }
    }
    else {
        dataRouletteStore.set(defaultValue, defaultValue);
        return defaultValue;
    }
};
var handleSpin = function () {
    dataRouletteStore.setSpun(true);
    forceReRender();
};
var handleReset = function () {
    dataRouletteStore.setSpun(false);
    forceReRender();
};
var handleChange = function () {
    var channel = addons.getChannel();
    dataRouletteStore.reset();
    channel.emit(SET_ITEMS, { data: {}, timestamp: +new Date() });
    forceReRender();
};
var handleRefetch = function () {
    dataRouletteStore.fetchData();
    forceReRender();
};
export var registerDataRoulette = function (parameters) {
    useEffect(function () {
        var channel = addons.getChannel();
        channel.on(SPIN, handleSpin);
        channel.on(RESET, handleReset);
        channel.on(STORY_CHANGED, handleChange);
        channel.on(REFETCH, handleRefetch);
        dataRouletteStore.initialize(parameters, channel);
        dataRouletteStore.subscribe(setPanelData);
        return function () {
            channel.removeListener(SPIN, handleSpin);
            channel.removeListener(STORY_CHANGED, handleChange);
            channel.removeListener(RESET, handleReset);
            channel.removeListener(REFETCH, handleRefetch);
            dataRouletteStore.unsubscribe(setPanelData);
        };
    }, []);
};
export var manager = function () { };
