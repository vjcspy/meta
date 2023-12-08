'use client';

import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';

function withLogger(WrappedComponent: any) {
  return function WithLogger(props: any) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const i = setInterval(() => setCount(Math.random), 2000);

      return () => {
        console.log('unmount withLogger');

        clearInterval(i);
      };
    }, []);

    return <WrappedComponent {...merge(props, { count })} />;
  };
}

// Component cha
function ParentComponent(props: any) {
  useEffect(() => {
    console.log('ParentComponent');

    return () => {
      console.log('unmount ParentComponent');
    };
  }, []);

  return <div>{JSON.stringify(props)}</div>;
}

// Sử dụng HOC để bọc component con
const Foo = withRefreshTicks(withLogger(ParentComponent));

export default Foo;
