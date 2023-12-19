export const CHARTJS_INTRADAY_OPTIONS: any = {
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
        // overScaleMode: 'x',
      },
      pan: {
        enabled: true,
        mode: 'x',
      },
    },
  },
};
