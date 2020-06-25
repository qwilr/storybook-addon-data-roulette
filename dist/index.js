import { makeDecorator } from '@storybook/addons';
import { registerDataRoulette } from './registerDataRoulette';
import { PARAM_KEY } from './constants';
export { dataRoulette } from './registerDataRoulette';
export var withDataRoulette = makeDecorator({
    name: 'withDataRoulette',
    parameterName: PARAM_KEY,
    skipIfNoParametersOrOptions: true,
    wrapper: function (getStory, context, _a) {
        var parameters = _a.parameters;
        registerDataRoulette(parameters);
        return getStory(context);
    },
});
