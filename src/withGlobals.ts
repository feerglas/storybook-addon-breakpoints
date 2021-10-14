import { StoryFn as StoryFunction, StoryContext } from '@storybook/addons';
import { useEffect, useGlobals } from '@storybook/addons';
import { showAddon, hideAddon } from './breakpoints';


const displayToolState = (selector: string, state: any, params: any) => {
  const rootElement = document.querySelector(selector);

  if (state.breakpointsActive && !state.isInDocs) {
    showAddon(rootElement, params);
  } else {
    hideAddon();
  }
}

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ breakpointsActive }] = useGlobals();
  const isInDocs = context.viewMode === 'docs';

  useEffect(() => {
    const selectorId = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : `#root`;

    displayToolState(selectorId, {
      breakpointsActive,
      isInDocs,
    }, context.parameters);
  }, [breakpointsActive]);

  return StoryFn();
};
