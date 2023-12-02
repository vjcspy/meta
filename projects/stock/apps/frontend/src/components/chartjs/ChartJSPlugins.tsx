'use-client';

import Chart from 'chart.js/auto';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { useState } from 'react';

const ChartJSPlugins = React.memo(
  (
    props: PropsWithChildren<{
      plugins: string[];
    }>,
  ) => {
    const { plugins = [] } = props;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const regisFns = [];
      if (plugins.includes('zoom')) {
        const registerPlugins = async () => {
          const zoomPlugin = (await import('chartjs-plugin-zoom')).default;
          // @ts-ignore
          Chart?.register(zoomPlugin);
        };
        regisFns.push(registerPlugins());
      }

      Promise.all(regisFns).then(() => {
        setLoaded(true);
      });
    }, []);

    return <>{loaded && props.children}</>;
  },
);

export default ChartJSPlugins;
