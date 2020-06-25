import React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID, PANEL_ID, TOOL_ID, PARAM_KEY } from './constants';
import Panel from './components/Panel';
import Tool from './components/Tool';

// Register the addon with a unique name.
addons.register(ADDON_ID, (api: any) => {
  // Also need to set a unique name to the panel.
  console.log(types)
  addons.add(PANEL_ID, {
    title: 'Data Roulette',
    paramKey: PARAM_KEY,
    type: types.PANEL,
    render: ({ active, key }: { active: any; key: any }) => (
      <Panel key={key} api={api} active={active} />
    ),
  });
  addons.add(TOOL_ID, {
    title: 'Data Roulette Tool',
    paramKey: PARAM_KEY,
    type: types.TOOL,
    render: () => (
      <Tool />
    ),
  });
});
