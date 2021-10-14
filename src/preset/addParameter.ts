/*
Example options:

breakpoints: {
  debounceTimeout: 200,
  breakpointNames: {
    'small': '500',
    'large': '1500',
    'medium': '1000'
  }
}
*/

import { config } from '../breakpoints';
import { PARAM_KEY } from '../constants';

const parameters: any = {};

if (process.env.NODE_ENV === 'devonly') {
  parameters[PARAM_KEY] = {};

  // set breakpoint names option
  parameters[PARAM_KEY][config.optionKeys.breakpointNames] = {
    small: '500',
    large: '1500',
    medium: '1000',
  };

  // set debounce option
  parameters[PARAM_KEY][config.optionKeys.debounce] = 0;
}

export {
  parameters,
};
