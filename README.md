# Data Roulette for Storybook

Got Google Sheets data? Have an unhealthy obsession with roulette? Then data roulette is the addon for you.

## Usage

Add the addon to your storybook config in `addons.js`.

```
import 'storybook-addon-data-roulette/register';
```

Use the `withDataRoulette` decorator (either in `config.js` or on a story by story basis).

### Use globally

```
import { addDecorator, addParamters } from '@storybook/react';
import { withDataRoulette } from 'storybook-addon-data-roulette';

addDecorator(withDataRoulette);
addParamters({
  'data-roulette': {
    apiKey: 'YOUR_GOOGLE_SHEETS_API_KEY',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET',
  }
});
```

### Use for a specific story

```
export default {
  component: MyComponent,
  decorators: [withDataRoulette],
  parameters: {
    'data-roulette': {
      apiKey: 'YOUR_GOOGLE_SHEETS_API_KEY',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET'
    }
  },
}
```

### Roulette values

Roulette some values using the `dataRoulette` function that accepts a Google Sheets column title to pull a random value from, and a default value to start with.

```
import { dataRoulette } from 'storybook-addon-data-roulette';

export const default = () => (
  <div>{dataRoulette('Sheets Column Title', 'Default Value')}</div>
);
```

SPIN THE WHEEL

## Development

You'll need to [generate an api key](https://developers.google.com/sheets/api/guides/authorizing#APIKey). Save `google-sheets-config.json` in the root directory. This needs to contain:

```
{
  "apiKey": "YOUR_API_KEY",
  ...
}
```

Install dependencies

```
npm install
```

Build the addon and watch for changes

```
npm run start
```

Start up storybook

```
npm run storybook
```

To do a production build

```
npm run build
```
