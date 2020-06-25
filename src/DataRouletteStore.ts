import { fetchSheetData } from './utils/sheets';
import { IAddonParams } from './index';
import { SET_LOADING, SET_ERROR, SET_SHEET } from './constants';

type Callback = () => any;

const callArg = (fn: Callback) => fn();
const callAll = (fns: Callback[]) => fns.forEach(callArg);

export default class DataRouletteStore {
  data: any = {};
  store: any = {};
  callbacks: Callback[] = [];
  channel: any;
  timer = 0;
  hasSpun = false;
  isLoading = true;
  initialized = false;
  addonParams: IAddonParams = { apiKey: '', sheetUrl: '' };
  error = '';

  initialize(parameters: IAddonParams, channel: any) {
    if (!this.initialized) {
      this.addonParams = parameters;
      this.initialized = true;
      this.channel = channel;
      this.channel.emit(SET_SHEET, this.addonParams.sheetUrl);
      this.fetchData();
    }
  }

  has(key: string) {
    return this.store[key] !== undefined;
  }

  set(key: string, value: string) {
    this.store[key] = {
      value,
      used: true,
    };

    // debounce the execution of the callbacks for 50 milliseconds
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(callAll, 50, this.callbacks);
  }

  async fetchData() {
    this.isLoading = true;
    this.channel.emit(SET_LOADING, true);

    const data = await fetchSheetData(this.addonParams);
    this.data = data;

    if (!data) {
      this.error = 'No data found for the given Google Sheet URL';
      this.channel.emit(SET_ERROR, this.error);
    }

    this.isLoading = false;
    this.channel.emit(SET_LOADING, false);
  }

  setSpun(value: boolean) {
    this.hasSpun = value;
  }

  update(key: string) {
    this.store[key] = {
      ...this.store[key],
    };
  }

  get(key: string) {
    const knob = this.store[key];
    if (knob) {
      knob.used = true;
    }
    return knob;
  }

  getAll() {
    return this.store;
  }

  reset() {
    this.hasSpun = false;
    this.store = {};
  }

  markAllUnused() {
    Object.keys(this.store).forEach((knobName) => {
      this.store[knobName].used = false;
    });
  }

  subscribe(cb: Callback) {
    this.callbacks.push(cb);
  }

  unsubscribe(cb: Callback) {
    const index = this.callbacks.indexOf(cb);
    this.callbacks.splice(index, 1);
  }
}
