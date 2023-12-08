'use client';

import React, { useEffect, useRef } from 'react';

const TestWorker = React.memo(() => {
  const workerRef = useRef<any>();
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/test.worker.ts', import.meta.url),
    );
    workerRef.current.onmessage = (event: any) =>
      console.log(`WebWorker Response => ${event.data}`);

    workerRef.current?.postMessage(100000);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return <></>;
});

export default TestWorker;
