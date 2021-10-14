/*
Example options:

breakpointNames: {
  debounceTimeout: 200,
  nameMap: {
    'small': '500',
    'large': '1500',
    'medium': '1000'
  }
}
*/

import { config } from '../breakpoints';

const parameters: any = {};

if (process.env.NODE_ENV === 'development') {

  // create main options object
  parameters[config.optionKeys.main] = {};

  // set breakpoint names option
  parameters[config.optionKeys.main][config.optionKeys.breakpointNames] = {
    'small': '500',
    'large': '1500',
    'medium': '1000'
  };

  // set debounce option
  parameters[config.optionKeys.main][config.optionKeys.debounce] = 200;

}

export {
  parameters
};
