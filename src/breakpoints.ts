import { PARAM_KEY } from './constants';

export const config = {
  classes: {
    wrapper: 'storybook-addon-breakpoints',
    pixel: 'storybook-addon-breakpoints__pixel',
    name: 'storybook-addon-breakpoints__name',
  },
  optionKeys: {
    debounce: 'debounceTimeout',
    breakpointNames: 'breakpointNames',
  },
};

let storybookAddonBreakpointsWrapper: HTMLDivElement;
let storybookAddonBreakpointsPixel: HTMLSpanElement;
let storybookAddonBreakpointsName: HTMLSpanElement;
let storybookAddonBreakpointsNamesMap: any;
let storybookAddonBreakpointsDebounce = 200;

// --- HELPERS

function debounce(func: Function, immediate: boolean) {
  let timeout: ReturnType<typeof setTimeout>;

  function debounceFN() {
    const context = this;
    const args = arguments;

    function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, storybookAddonBreakpointsDebounce);

    if (callNow) {
      func.apply(context, args);
    }
  }

  return debounceFN;
}

// --- BREAKPOINT NAMES
const getUserBreakpointNames = (params: any) => {
  if (!params) {
    return;
  }

  if (!Object.keys(params).includes(PARAM_KEY)) {
    return;
  }

  const options = params[PARAM_KEY];

  if (!Object.keys(options).includes(config.optionKeys.breakpointNames)) {
    return;
  }

  const nameMap = options[config.optionKeys.breakpointNames];
  storybookAddonBreakpointsNamesMap = Object
    .entries(nameMap)
    .sort((a:[string, string], b:[string, string]) => (parseInt(b[1], 10) - parseInt(a[1], 10)));
};

const getBreakpointNameForWidth = (width: number) => {
  if (!storybookAddonBreakpointsNamesMap) {
    return '';
  }

  let breakpointName = '';

  storybookAddonBreakpointsNamesMap.forEach((entry: any) => {
    const key = entry[0];
    const value = parseInt(entry[1], 10);

    if (width <= value) {
      breakpointName = key;
    }
  });

  return breakpointName;
};

// --- USER OPTIONS
const getUserOptions = (params: any) => {
  if (!params) {
    return;
  }

  if (!Object.keys(params).includes(PARAM_KEY)) {
    return;
  }

  const options = params[PARAM_KEY];

  // set debounce
  if (Object.keys(options).includes(config.optionKeys.debounce)) {
    storybookAddonBreakpointsDebounce = options[config.optionKeys.debounce];
  }
};

// --- DOM NODES CREATION
const createWrapper = (appendTo: Element) => {
  if (storybookAddonBreakpointsWrapper) {
    return;
  }

  storybookAddonBreakpointsWrapper = document.createElement('div');
  storybookAddonBreakpointsWrapper.classList.add(config.classes.wrapper);
  storybookAddonBreakpointsWrapper.style.setProperty('position', 'absolute');
  storybookAddonBreakpointsWrapper.style.setProperty('margin', '0');
  storybookAddonBreakpointsWrapper.style.setProperty('top', 'auto');
  storybookAddonBreakpointsWrapper.style.setProperty('right', '0');
  storybookAddonBreakpointsWrapper.style.setProperty('bottom', '0');
  storybookAddonBreakpointsWrapper.style.setProperty('left', 'auto');
  storybookAddonBreakpointsWrapper.style.setProperty('width', 'auto');
  storybookAddonBreakpointsWrapper.style.setProperty('background', 'black');
  storybookAddonBreakpointsWrapper.style.setProperty('border-top', '2px solid white');
  storybookAddonBreakpointsWrapper.style.setProperty('border-left', '2px solid white');
  storybookAddonBreakpointsWrapper.style.setProperty('color', 'white');
  storybookAddonBreakpointsWrapper.style.setProperty('font-family', 'monospace');
  storybookAddonBreakpointsWrapper.style.setProperty('padding', '.5rem 1rem');
  storybookAddonBreakpointsWrapper.style.setProperty('text-align', 'center');
  appendTo.appendChild(storybookAddonBreakpointsWrapper);
};

const createPixelElement = () => {
  if (storybookAddonBreakpointsPixel) {
    return;
  }

  storybookAddonBreakpointsPixel = document.createElement('span');
  storybookAddonBreakpointsPixel.classList.add(config.classes.pixel);
  storybookAddonBreakpointsPixel.style.setProperty('display', 'block');
  storybookAddonBreakpointsPixel.style.setProperty('color', 'rgba(255,255,255,.7)');
  storybookAddonBreakpointsWrapper.appendChild(storybookAddonBreakpointsPixel);
};

const createNameElement = () => {
  if (storybookAddonBreakpointsName) {
    return;
  }

  storybookAddonBreakpointsName = document.createElement('span');
  storybookAddonBreakpointsName.classList.add(config.classes.name);
  storybookAddonBreakpointsName.style.setProperty('display', 'block');
  storybookAddonBreakpointsWrapper.appendChild(storybookAddonBreakpointsName);
};

// --- RESIZING

const resizeCallback = (evt?: Event) => {
  let target;

  if (!evt) {
    target = window;
  } else {
    target = evt.currentTarget as Window;
  }

  const width = target.innerWidth;

  if (!storybookAddonBreakpointsPixel || !storybookAddonBreakpointsName) {
    return;
  }

  storybookAddonBreakpointsPixel.innerText = `${width}px`;
  storybookAddonBreakpointsName.innerText = getBreakpointNameForWidth(width);
};

const handleResize = debounce(
  resizeCallback,
  false,
);

const addEventListener = () => {
  window.addEventListener('resize', handleResize);
};

const removeEventListener = () => {
  window.removeEventListener('resize', handleResize);
};

// --- TOGGLING ADDON

export const showAddon = (root: Element, params: any) => {
  getUserBreakpointNames(params);
  getUserOptions(params);
  createWrapper(root);
  createPixelElement();
  createNameElement();

  resizeCallback();
  addEventListener();
};

export const hideAddon = () => {
  if (storybookAddonBreakpointsWrapper) {
    storybookAddonBreakpointsWrapper.remove();
  }

  removeEventListener();

  storybookAddonBreakpointsWrapper = undefined;
  storybookAddonBreakpointsPixel = undefined;
  storybookAddonBreakpointsName = undefined;
};
