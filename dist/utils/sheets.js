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
var API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';
var PERMISSION_DENIED = 'PERMISSION_DENIED';
export function fetchSheetData(parameters) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var sheetUrl, apiKey, sheetId, sheetDetails, sheetTitles_1, requestUrls, responses, sheetDatasets, formattedData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sheetUrl = parameters.sheetUrl, apiKey = parameters.apiKey;
                    sheetId = sheetUrlToId(sheetUrl);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("" + API_URL + sheetId + "?key=" + apiKey)];
                case 2: return [4 /*yield*/, (_b.sent()).json()];
                case 3:
                    sheetDetails = _b.sent();
                    if (((_a = sheetDetails === null || sheetDetails === void 0 ? void 0 : sheetDetails.error) === null || _a === void 0 ? void 0 : _a.status) === PERMISSION_DENIED) {
                        throw new Error(PERMISSION_DENIED);
                    }
                    sheetTitles_1 = sheetDetails.sheets.map(function (sheet) { return sheet.properties.title; });
                    requestUrls = sheetTitles_1.map(function (sheet) {
                        var ranges = "&ranges=" + sheet + "&majorDimension=ROWS";
                        var requestUrl = "" + API_URL + sheetId + "/values:batchGet?key=" + apiKey + ranges;
                        return fetch(requestUrl);
                    });
                    return [4 /*yield*/, Promise.all(requestUrls)];
                case 4:
                    responses = _b.sent();
                    return [4 /*yield*/, Promise.all(responses.map(function (response) { return response.json(); }))];
                case 5:
                    sheetDatasets = _b.sent();
                    formattedData = sheetDatasets.reduce(function (acc, curr, index) {
                        var sheetKey = sheetTitles_1[index];
                        acc[sheetKey] = formatSheetRowsByColumn(curr);
                        return acc;
                    }, {});
                    return [2 /*return*/, formattedData];
                case 6:
                    error_1 = _b.sent();
                    if (error_1.message === PERMISSION_DENIED) {
                        console.error('Please set your Sheet URL to public under Share');
                    }
                    else {
                        console.error('Please enter a valid public Google Sheets URL');
                    }
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Format rows into objects using column headers as keys for each value
export function formatSheetRowsByColumn(data) {
    var values = data.valueRanges[0].values;
    var keys = values === null || values === void 0 ? void 0 : values.shift();
    return values === null || values === void 0 ? void 0 : values.map(function (value) {
        return keys.reduce(function (acc, curr, index) {
            acc[curr] = value[index];
            return acc;
        }, {});
    });
}
// Grab the sheet id from the url string
export function sheetUrlToId(url) {
    if (!(url === null || url === void 0 ? void 0 : url.includes('://')))
        return null;
    try {
        var urlObj = new URL(url);
        var id = urlObj.pathname
            .replace('/spreadsheets/d/', '')
            .replace('/edit', '')
            .replace('/', '');
        return id;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return null;
    }
}
