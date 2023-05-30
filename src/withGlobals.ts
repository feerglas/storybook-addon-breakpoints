import { useEffect, useGlobals } from '@storybook/preview-api';
import type { PartialStoryFn as StoryFunction, StoryContext } from '@storybook/types';
import { showAddon, hideAddon } from './breakpoints';

const displayToolState = (selector: string, state: any, params: any) => {
  const rootElement = document.querySelector(selector);

  if (state.breakpointsActive && !state.isInDocs) {
    showAddon(rootElement, params);
  } else {
    hideAddon();
  }
};

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ breakpointsActive }] = useGlobals();
  const isInDocs = context.viewMode === 'docs';

  useEffect(() => {
    const selectorId = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : '#storybook-root';

    displayToolState(selectorId, {
      breakpointsActive,
      isInDocs,
    }, context.parameters);
  }, [breakpointsActive]);

  return StoryFn();
};
