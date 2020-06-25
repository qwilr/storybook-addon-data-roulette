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
import React from 'react';
var sizes = {
    small: 16,
    medium: 24,
};
var RouletteIcon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b, props = __rest(_a, ["size"]);
    var iconSize = sizes[size];
    return (React.createElement("svg", __assign({ width: iconSize, height: iconSize, fill: "currentColor", viewBox: "0 0 " + iconSize + " " + iconSize }, props),
        size === 'medium' &&
            React.createElement("path", { d: "M12 1c-1.185 0-2.328.188-3.4.536l.618 1.902A8.992 8.992 0 0112 3c.973 0 1.908.154 2.782.438l.618-1.902A10.992 10.992 0 0012 1zM7.004 2.197a11.044 11.044 0 00-4.807 4.807l1.782.91a9.044 9.044 0 013.935-3.935l-.91-1.782zM23 12c0-1.185-.188-2.328-.536-3.4l-1.902.618A8.99 8.99 0 0121 12a8.99 8.99 0 01-.438 2.782l1.902.618c.348-1.072.536-2.215.536-3.4zM1.536 8.6A10.992 10.992 0 001 12c0 1.185.188 2.328.536 3.4l1.902-.618A8.992 8.992 0 013 12c0-.973.154-1.908.438-2.782L1.536 8.6zm.661 8.396a11.044 11.044 0 004.807 4.807l.91-1.782a9.044 9.044 0 01-3.935-3.935l-1.782.91zm14.799 4.807a11.045 11.045 0 004.807-4.807l-1.782-.91a9.044 9.044 0 01-3.935 3.935l.91 1.782zm-8.396.661c1.072.348 2.215.536 3.4.536s2.328-.188 3.4-.536l-.618-1.902A8.99 8.99 0 0112 21a8.99 8.99 0 01-2.782-.438L8.6 22.464zm4.418-11.482L12.2 6.98a1 1 0 10-.4 0l-.818 4.002-4.002.818a1 1 0 100 .4l4.002.818.818 4.002a1 1 0 10.4 0l.818-4.002 4.002-.818a1 1 0 100-.4l-4.002-.818zM19 7a2 2 0 100-4 2 2 0 000 4z" }),
        size === 'small' &&
            React.createElement("path", { d: "M14.763 9.812l.483.13.483.129A8.01 8.01 0 0016 8c0-.715-.094-1.41-.27-2.07l-.484.128-.483.13A7.01 7.01 0 0115 8a7.01 7.01 0 01-.237 1.812zM9.942.754l-.13.483A7.01 7.01 0 008 1a7.01 7.01 0 00-1.812.237l-.13-.483L5.93.27A8.01 8.01 0 018 0c.715 0 1.41.094 2.07.27l-.128.484zm-5.693.75l.25.433a7.034 7.034 0 00-2.562 2.562l-.433-.25-.433-.25A8.034 8.034 0 014 1.07l.25.433zM1 8c0-.627.082-1.234.237-1.812l-.483-.13L.27 5.93A8.01 8.01 0 000 8c0 .715.094 1.41.27 2.07l.484-.128.483-.13A7.01 7.01 0 011 8zm.504 3.751l.433-.25a7.035 7.035 0 002.562 2.562l-.25.433-.25.433A8.035 8.035 0 011.07 12l.433-.25zm4.554 3.495l.13-.483A7.01 7.01 0 008 15a7.01 7.01 0 001.812-.237l.13.483.129.483A8.01 8.01 0 018 16c-.715 0-1.41-.094-2.07-.27l.128-.484zm5.693-.75l-.25-.433a7.035 7.035 0 002.562-2.562l.433.25.433.25A8.035 8.035 0 0112 14.93l-.25-.433zM8.679 7.321L8.2 4.98a1 1 0 10-.4 0L7.32 7.32 4.98 7.8a1 1 0 100 .4l2.341.479.479 2.341a1 1 0 10.4 0L8.68 8.68 11.02 8.2a1 1 0 100-.4L8.68 7.32zM13 4a1 1 0 100-2 1 1 0 000 2z" })));
};
export default RouletteIcon;
