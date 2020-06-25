import { addons } from '@storybook/addons';
import {
  SPIN,
  RESET,
  SET_LOADING,
  REFETCH,
  SET_ITEMS,
} from './constants';
import { useEffect } from '@storybook/client-api';
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events';
import DataRouletteStore from './DataRouletteStore';
import { shuffle } from 'lodash';
import { IAddonParams } from './index';

const dataRouletteStore = new DataRouletteStore();

function setPanelData(timestamp = +new Date()) {
  const channel = addons.getChannel();
  channel.emit(SET_ITEMS, { data: dataRouletteStore.getAll(), timestamp });
  channel.emit(SET_LOADING, dataRouletteStore.isLoading);
}

function forceReRender() {
  addons.getChannel().emit(FORCE_RE_RENDER);
}

export const dataRoulette = (key: string, defaultValue: string) => {
  const { hasSpun, isLoading, data } = dataRouletteStore;

  if (hasSpun && !isLoading) {
    const shuffledData = Object.keys(data).map((dataKey) =>
      shuffle(data[dataKey])
    );

    const relevantSet = shuffledData.find((set) => {
      return set.find(item => !!item[key]);
    });

    if (relevantSet?.length) {
      const value = relevantSet.filter(item => !!item[key])[0][key];
      dataRouletteStore.set(defaultValue, value);
      return value;
    } else {
      dataRouletteStore.set(defaultValue, defaultValue);
      return defaultValue;
    }
  } else {
    dataRouletteStore.set(defaultValue, defaultValue);
    return defaultValue;
  }
};

const handleSpin = () => {
  dataRouletteStore.setSpun(true);
  forceReRender();
};

const handleReset = () => {
  dataRouletteStore.setSpun(false);
  forceReRender();
};

const handleChange = () => {
  const channel = addons.getChannel();
  dataRouletteStore.reset();
  channel.emit(SET_ITEMS, { data: {}, timestamp: +new Date() });
  forceReRender();
};

const handleRefetch = () => {
  dataRouletteStore.fetchData();
  forceReRender();
};

export const registerDataRoulette = (parameters: IAddonParams) => {
  useEffect(() => {
    const channel = addons.getChannel();

    channel.on(SPIN, handleSpin);
    channel.on(RESET, handleReset);
    channel.on(STORY_CHANGED, handleChange);
    channel.on(REFETCH, handleRefetch);
    dataRouletteStore.initialize(parameters, channel);
    dataRouletteStore.subscribe(setPanelData);

    return () => {
      channel.removeListener(SPIN, handleSpin);
      channel.removeListener(STORY_CHANGED, handleChange);
      channel.removeListener(RESET, handleReset);
      channel.removeListener(REFETCH, handleRefetch);
      dataRouletteStore.unsubscribe(setPanelData);
    };
  }, []);
};

export const manager = () => {};
