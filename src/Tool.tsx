import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ breakpointsActive }, updateGlobals] = useGlobals();

  const toggleBreakpoints = useCallback(
    () =>
      updateGlobals({
        breakpointsActive: !breakpointsActive,
      }),
    [breakpointsActive]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={breakpointsActive}
      title="Display Breakpoints"
      onClick={toggleBreakpoints}
    >
      {/*
        Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
        for the full list of icons
      */}
      <Icons icon="browser" />
    </IconButton>
  );
};
