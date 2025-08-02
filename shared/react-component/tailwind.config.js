/** @type {import('tailwindcss').Config} */
import { designSystem } from '../tailwind-config/tailwind.config.js';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: designSystem,
  },
  plugins: [],
};
