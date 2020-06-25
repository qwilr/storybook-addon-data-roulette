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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
import { styled } from '@storybook/theming';
var Spinner = forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 32 : _b, _c = _a.strokeWidth, strokeWidth = _c === void 0 ? 2 : _c, style = _a.style, rest = __rest(_a, ["size", "strokeWidth", "style"]);
    var radius = size / 2;
    var offsetRadius = radius - strokeWidth / 2;
    var circumference = size * Math.PI;
    return (React.createElement(SpinnerWrapper, { ref: ref, style: style },
        React.createElement("svg", __assign({ className: "spinner__element", fill: "none", strokeWidth: strokeWidth, width: size, height: size, strokeLinecap: "round", viewBox: radius + " " + radius + " " + size + " " + size }, rest),
            React.createElement("circle", { className: "spinner__path", cx: size, cy: size, r: offsetRadius, strokeDasharray: circumference + " " + circumference * 0.25, strokeDashoffset: circumference }))));
});
var SpinnerWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @keyframes spinner-rotate {\n    100% {\n      transform: rotate(360deg) translate3d(0, 0, 0);\n    }\n  }\n\n  svg {\n    fill: none;\n    display: block;\n    animation: spinner-rotate 1s linear infinite;\n    transform-origin: center center;\n  }\n\n  circle {\n    stroke: currentColor;\n  }\n"], ["\n  @keyframes spinner-rotate {\n    100% {\n      transform: rotate(360deg) translate3d(0, 0, 0);\n    }\n  }\n\n  svg {\n    fill: none;\n    display: block;\n    animation: spinner-rotate 1s linear infinite;\n    transform-origin: center center;\n  }\n\n  circle {\n    stroke: currentColor;\n  }\n"])));
export default Spinner;
var templateObject_1;
