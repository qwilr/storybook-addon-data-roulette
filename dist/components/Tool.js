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
import React from 'react';
import { useAddonState } from '@storybook/api';
import { IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';
import { ADDON_ID, SPIN } from '../constants';
import { initialState, useAddonChannelEvents } from './Panel';
import RouletteIcon from "./RouletteIcon";
var Tool = function () {
    var _a = useAddonState(ADDON_ID, initialState), addonState = _a[0], setAddonState = _a[1];
    var spinIndex = addonState.spinIndex, items = addonState.items, loading = addonState.loading, error = addonState.error;
    var emit = useAddonChannelEvents(addonState, setAddonState);
    var hasItems = !!Object.keys((items === null || items === void 0 ? void 0 : items.data) || {}).length;
    console.log(items);
    var label = 'Spin data roulette';
    var handleSpin = function () {
        emit(SPIN);
        setAddonState(__assign(__assign({}, addonState), { spinIndex: spinIndex + 1 }));
    };
    return (React.createElement(ToolButton, { "aria-label": label, title: label, onClick: handleSpin, disabled: !hasItems || loading || error },
        React.createElement(RouletteIcon, { style: { transform: "rotate(" + spinIndex * 90 + "deg)" }, size: "small" })));
};
var ToolButton = styled(IconButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &:disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  svg {\n    display: block;\n    width: 16px;\n    height: 16px;\n    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &:disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  svg {\n    display: block;\n    width: 16px;\n    height: 16px;\n    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n"])));
export default Tool;
var templateObject_1;
