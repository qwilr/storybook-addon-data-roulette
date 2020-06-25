import { makeDecorator } from '@storybook/addons';
import { registerDataRoulette } from './registerDataRoulette';
import { PARAM_KEY } from './constants';

export { dataRoulette } from './registerDataRoulette';

export interface IAddonParams {
  apiKey: string;
  sheetUrl: string;
}

export const withDataRoulette = makeDecorator({
  name: 'withDataRoulette',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (
    getStory: any,
    context: any,
    { parameters }: { parameters: IAddonParams }
  ) => {
    registerDataRoulette(parameters);

    return getStory(context);
  },
});
