import type { ChartOptions } from 'chart.js';

export const CHARTJS_INTRADAY_OPTIONS: ChartOptions = {
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: false,
        },
        mode: 'x',
        // scaleMode: 'y',
        overScaleMode: 'x',
      },
      pan: {
        enabled: true,
        mode: 'x',
      },
    },
  },
};
