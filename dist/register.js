import React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID, PANEL_ID, TOOL_ID, PARAM_KEY } from './constants';
import Panel from './components/Panel';
import Tool from './components/Tool';
// Register the addon with a unique name.
addons.register(ADDON_ID, function (api) {
    // Also need to set a unique name to the panel.
    console.log(types);
    addons.add(PANEL_ID, {
        title: 'Data Roulette',
        paramKey: PARAM_KEY,
        type: types.PANEL,
        render: function (_a) {
            var active = _a.active, key = _a.key;
            return (React.createElement(Panel, { key: key, api: api, active: active }));
        },
    });
    addons.add(TOOL_ID, {
        title: 'Data Roulette Tool',
        paramKey: PARAM_KEY,
        type: types.TOOL,
        render: function () { return (React.createElement(Tool, null)); },
    });
});
