import { StoryFn as StoryFunction, StoryContext } from '@storybook/addons';
import { useEffect, useGlobals } from '@storybook/addons';

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ breakpointsActive }] = useGlobals();
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === 'docs';

  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selectorId = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : `#root`;

    displayToolState(selectorId, {
      breakpointsActive,
      isInDocs,
    });
  }, [breakpointsActive]);

  return StoryFn();
};

const showAddon = (root: Element, wrapper: HTMLDivElement) => {
  let pixelElement: HTMLSpanElement;
  let nameElement: HTMLSpanElement;

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.classList.add('storybook-addon-breakpoints');
    wrapper.style.setProperty('position', 'absolute');
    wrapper.style.setProperty('margin', '0');
    wrapper.style.setProperty('top', 'auto');
    wrapper.style.setProperty('right', '0');
    wrapper.style.setProperty('bottom', '0');
    wrapper.style.setProperty('left', 'auto');
    wrapper.style.setProperty('width', '10rem');
    wrapper.style.setProperty('background', 'green');
    root.appendChild(wrapper);
  }

  pixelElement = wrapper.querySelector('span.storybook-addon-breakpoints__pixel');

  if (!pixelElement) {
    pixelElement = document.createElement('span');
    pixelElement.classList.add('storybook-addon-breakpoints__pixel');
    wrapper.appendChild(pixelElement);
  }

  nameElement = wrapper.querySelector('span.storybook-addon-breakpoints__name');

  if (!nameElement) {
    nameElement = document.createElement('span');
    nameElement.classList.add('storybook-addon-breakpoints__name');
    wrapper.appendChild(nameElement);
  }

  pixelElement.innerText = '1024px';
  nameElement.innerText = 'breakpoint-small-max';
}

const hideAddon = (wrapper: HTMLDivElement) => {
  if (wrapper) {
    wrapper.remove();
  }
}

const displayToolState = (selector: string, state: any) => {
  const addonIsActive = state.breakpointsActive;
  const rootElement = document.querySelector(selector);
  let wrapperElement: HTMLDivElement = rootElement.querySelector('div.storybook-addon-breakpoints');

  if (addonIsActive) {
    showAddon(rootElement, wrapperElement);
  } else {
    hideAddon(wrapperElement);
  }

}
