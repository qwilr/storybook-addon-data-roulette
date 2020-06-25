import { addDecorator, addParameters } from '@storybook/react';
import { withDataRoulette } from '../dist';
import { apiKey } from '../google-sheets-config.json';

const sheetUrl =
  'https://docs.google.com/spreadsheets/d/1kJ4cprV4qJsI3JUWI35208xU1Ao7BkNLA2Afjj97xWg';

addDecorator(withDataRoulette);
addParameters({ 'data-roulette': { apiKey, sheetUrl } });
