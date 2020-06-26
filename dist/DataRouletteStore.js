var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { SET_LOADING, SET_ERROR, SET_SHEET } from './constants';
var API_URL = 'https://1w4z19fmx9.execute-api.us-east-1.amazonaws.com/dev/getSheetData';
var callArg = function (fn) { return fn(); };
var callAll = function (fns) { return fns.forEach(callArg); };
var DataRouletteStore = /** @class */ (function () {
    function DataRouletteStore() {
        this.data = {};
        this.store = {};
        this.callbacks = [];
        this.timer = 0;
        this.hasSpun = false;
        this.isLoading = true;
        this.initialized = false;
        this.addonParams = { apiKey: '', sheetUrl: '' };
        this.error = '';
    }
    DataRouletteStore.prototype.initialize = function (parameters, channel) {
        if (!this.initialized) {
            this.addonParams = parameters;
            this.initialized = true;
            this.channel = channel;
            this.channel.emit(SET_SHEET, this.addonParams.sheetUrl);
            this.fetchData();
        }
    };
    DataRouletteStore.prototype.has = function (key) {
        return this.store[key] !== undefined;
    };
    DataRouletteStore.prototype.set = function (key, value) {
        this.store[key] = {
            value: value,
            used: true,
        };
        // debounce the execution of the callbacks for 50 milliseconds
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(callAll, 50, this.callbacks);
    };
    DataRouletteStore.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sheetUrl, requestUrl, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        this.channel.emit(SET_LOADING, true);
                        sheetUrl = this.addonParams.sheetUrl;
                        requestUrl = API_URL + "?sheetUrl=" + sheetUrl;
                        return [4 /*yield*/, fetch(requestUrl, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.data = data;
                        if (!data) {
                            this.error = 'No data found for the given Google Sheet URL';
                            this.channel.emit(SET_ERROR, this.error);
                        }
                        this.isLoading = false;
                        this.channel.emit(SET_LOADING, false);
                        return [2 /*return*/];
                }
            });
        });
    };
    DataRouletteStore.prototype.setSpun = function (value) {
        this.hasSpun = value;
    };
    DataRouletteStore.prototype.update = function (key) {
        this.store[key] = __assign({}, this.store[key]);
    };
    DataRouletteStore.prototype.get = function (key) {
        var knob = this.store[key];
        if (knob) {
            knob.used = true;
        }
        return knob;
    };
    DataRouletteStore.prototype.getAll = function () {
        return this.store;
    };
    DataRouletteStore.prototype.reset = function () {
        this.hasSpun = false;
        this.store = {};
    };
    DataRouletteStore.prototype.markAllUnused = function () {
        var _this = this;
        Object.keys(this.store).forEach(function (knobName) {
            _this.store[knobName].used = false;
        });
    };
    DataRouletteStore.prototype.subscribe = function (cb) {
        this.callbacks.push(cb);
    };
    DataRouletteStore.prototype.unsubscribe = function (cb) {
        var index = this.callbacks.indexOf(cb);
        this.callbacks.splice(index, 1);
    };
    return DataRouletteStore;
}());
export default DataRouletteStore;
