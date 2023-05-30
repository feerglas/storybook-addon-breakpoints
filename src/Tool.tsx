import React, { useCallback } from 'react';
import { useGlobals } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import BreakpointIcon from './components/BreakpointIcon';
import { TOOL_ID } from './constants';

export const Tool = () => {
  const [{ breakpointsActive }, updateGlobals] = useGlobals();

  const toggleBreakpoints = useCallback(
    () => updateGlobals({
      breakpointsActive: !breakpointsActive,
    }),
    [breakpointsActive],
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={breakpointsActive}
      title="Display Breakpoints"
      onClick={toggleBreakpoints}
    >

      <BreakpointIcon />
    </IconButton>
  );
};
