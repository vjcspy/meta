import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';

// Configure React testing environment to suppress act() warnings
if (typeof global !== 'undefined') {
  global.IS_REACT_ACT_ENVIRONMENT = true;
}

// Suppress React suspended resource warnings in Storybook
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('A suspended resource finished loading inside a test') ||
       args[0].includes('act(...)'))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;