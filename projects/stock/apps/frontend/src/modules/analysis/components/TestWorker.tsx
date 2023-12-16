'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TestWorker = React.memo(() => {
  const router = useRouter();
  useEffect(() => {
    router.push('/analysis/tick/range-market');
  }, []);

  return <></>;
});

export default TestWorker;
