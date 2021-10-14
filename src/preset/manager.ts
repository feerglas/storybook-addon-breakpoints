import { addons, types } from '@storybook/addons';

import { ADDON_ID, TOOL_ID, PARAM_KEY } from '../constants';
import { Tool } from '../Tool';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Breakpoints',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story)$/)),
    render: Tool,
    paramKey: PARAM_KEY,
  });
});
