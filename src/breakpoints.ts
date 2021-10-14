const config = {
  classes: {
    wrapper: 'storybook-addon-breakpoints',
    pixel: 'storybook-addon-breakpoints__pixel',
    name: 'storybook-addon-breakpoints__name'
  }
};

let storybookAddonBreakpointsWrapper: HTMLDivElement;
let storybookAddonBreakpointsPixel: HTMLSpanElement;
let storybookAddonBreakpointsName: HTMLSpanElement;
let storybookAddonBreakpointNamesMap: any;

// --- HELPERS

function debounce(func: Function, wait: number, immediate: boolean) {

  let timeout: ReturnType<typeof setTimeout>;

  return function() {
      const context = this
      const args = arguments;
      const later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
      };
      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args)
      };
  };
};

// --- BREAKPOINT NAMES
const setBreakpointNames = (params: any) => {
  if (!params) {
    return;
  }

  if (!Object.keys(params).includes('breakpointNames')) {
    return;
  }

  storybookAddonBreakpointNamesMap = Object.entries(params.breakpointNames).sort((a:[string, string], b:[string, string]) => parseInt(b[1]) - parseInt(a[1]));
}

const getBreakpointNameForWidth = (width: number) => {
  if (!storybookAddonBreakpointNamesMap) {
    return '';
  }

  let breakpointName = '';

  storybookAddonBreakpointNamesMap.forEach((entry: any) => {
    const key = entry[0]
    const value = parseInt(entry[1]);

    if (width < value) {
      breakpointName = key;
    }
  });

  return breakpointName;
}

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
  storybookAddonBreakpointsWrapper.style.setProperty('width', '10rem');
  storybookAddonBreakpointsWrapper.style.setProperty('background', 'green');
  appendTo.appendChild(storybookAddonBreakpointsWrapper);
};

const createPixelElement = () => {
  if (storybookAddonBreakpointsPixel) {
    return;
  }

  storybookAddonBreakpointsPixel = document.createElement('span');
  storybookAddonBreakpointsPixel.classList.add(config.classes.pixel);
  storybookAddonBreakpointsWrapper.appendChild(storybookAddonBreakpointsPixel);
};

const createNameElement = () => {
  if (storybookAddonBreakpointsName) {
    return;
  }

  storybookAddonBreakpointsName = document.createElement('span');
  storybookAddonBreakpointsName.classList.add(config.classes.name);
  storybookAddonBreakpointsWrapper.appendChild(storybookAddonBreakpointsName);
};

// --- RESIZING

const resizeCallback = (evt?: Event) => {
  let target;

  if (!evt) {
    target = window;
  } else {
    target = evt.currentTarget as Window
  }

  const width = target.innerWidth;

  if (!storybookAddonBreakpointsPixel || !storybookAddonBreakpointsName) {
    return;
  }

  storybookAddonBreakpointsPixel.innerText = `${width}px`;
  storybookAddonBreakpointsName.innerText = getBreakpointNameForWidth(width);
}

const handleResize = debounce(
  resizeCallback,
  200,
  false
);

const addEventListener = () => {
  window.addEventListener('resize', handleResize);
};

const removeEventListener = () => {
  window.removeEventListener('resize', handleResize);
};

// --- TOGGLING ADDON

export const showAddon = (root: Element, params: any) => {
  setBreakpointNames(params);
  createWrapper(root)
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
