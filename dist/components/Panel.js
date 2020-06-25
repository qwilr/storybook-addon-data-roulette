var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import React, { Fragment } from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import { AddonPanel, Button, ActionBar } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Transition, TransitionGroup } from 'react-transition-group';
import { SPIN, SET_ITEMS, RESET, SET_LOADING, REFETCH, SET_ERROR, SET_SHEET, ADDON_ID } from '../constants';
import RouletteIcon from './RouletteIcon';
import Spinner from './Spinner';
export var initialState = {
    spinIndex: 0,
    loading: false,
    items: {},
    error: '',
    sheetUrl: '',
};
var Panel = function (_a) {
    var active = _a.active, api = _a.api;
    var _b = useAddonState(ADDON_ID, initialState), addonState = _b[0], setAddonState = _b[1];
    var spinIndex = addonState.spinIndex, loading = addonState.loading, items = addonState.items, error = addonState.error, sheetUrl = addonState.sheetUrl;
    var emit = useAddonChannelEvents(addonState, setAddonState);
    var hasItems = !!Object.keys((items === null || items === void 0 ? void 0 : items.data) || {}).length;
    var handleSpin = function () {
        setAddonState(__assign(__assign({}, addonState), { spinIndex: spinIndex + 1 }));
        emit(SPIN);
    };
    var handleReset = function () {
        setAddonState(__assign(__assign({}, addonState), { spinIndex: 0 }));
        emit(RESET);
    };
    var handleView = function () {
        window.open(sheetUrl, '_blank');
    };
    return (React.createElement(AddonPanel, { active: active },
        hasItems && !error && (React.createElement(Fragment, null,
            React.createElement(PanelContent, null,
                React.createElement(Button, { tertiary: true, onClick: handleSpin },
                    React.createElement(ButtonContent, null,
                        React.createElement(RouletteIcon, { style: { transform: "rotate(" + spinIndex * 90 + "deg)" } }),
                        "Spin the wheel"))),
            React.createElement(TransitionGroup, null, loading && (React.createElement(Transition, { timeout: 400, onEnter: function (node) { return node && node.offsetHeight; } }, function (status) { return (React.createElement(PanelOverlay, { status: status },
                React.createElement(Spinner, null))); }))),
            React.createElement(ActionBar, { actionItems: [
                    { title: 'Reset', onClick: handleReset },
                    { title: 'View Data', onClick: handleView },
                    { title: 'Refetch Data', onClick: function () { return emit(REFETCH); } },
                ] }))),
        !hasItems && !loading && !error && (React.createElement(PanelContent, null, "No roulette-able content found")),
        !!error && (React.createElement(PanelContent, null, error))));
};
export function useAddonChannelEvents(addonState, setAddonState) {
    var _a;
    var emit = useChannel((_a = {},
        _a[SET_ITEMS] = function (items) {
            setAddonState(__assign(__assign({}, addonState), { items: items }));
            console.log('setit', items);
        },
        _a[SET_LOADING] = function (loading) {
            setAddonState(__assign(__assign({}, addonState), { loading: loading }));
        },
        _a[SET_ERROR] = function (error) {
            setAddonState(__assign(__assign({}, addonState), { error: error }));
        },
        _a[SET_SHEET] = function (sheetUrl) {
            setAddonState(__assign(__assign({}, addonState), { sheetUrl: sheetUrl }));
        },
        _a));
    return emit;
}
var PanelContent = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-gap: 16;\n  padding: 32;\n  justify-items: center;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  height: 100%;\n"], ["\n  display: grid;\n  grid-gap: 16;\n  padding: 32;\n  justify-items: center;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  height: 100%;\n"])));
var PanelOverlay = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.4s ease;\n  opacity: ", ";\n"], ["\n  background-color: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.4s ease;\n  opacity: ",
    ";\n"])), function (props) { return props.theme.background.content; }, function (props) {
    return props.status === 'entering' || props.status === 'entered' ? 1 : 0;
});
var ButtonContent = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n\n  svg {\n    width: 24px;\n    height: 24px;\n    display: block;\n    position: relative;\n    left: -4px;\n    margin-right: 2px;\n    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    opacity: 0.7;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n\n  svg {\n    width: 24px;\n    height: 24px;\n    display: block;\n    position: relative;\n    left: -4px;\n    margin-right: 2px;\n    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    opacity: 0.7;\n  }\n"])));
export default Panel;
var templateObject_1, templateObject_2, templateObject_3;
