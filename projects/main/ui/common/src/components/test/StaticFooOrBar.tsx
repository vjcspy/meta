import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useState } from 'react';

const StaticFooOrBar = combineHOC()(() => {
  const [foo, setFoo] = useState(true);
  return (
    <>
      <pre>
        <button
          onClick={() => {
            setFoo(!foo);
          }}
        >
          Toggle Foo/Bar
        </button>
      </pre>
      {foo ? (
        <UiExtension uiId="STATIC_FOO" />
      ) : (
        <UiExtension uiId="STATIC_BAR" />
      )}
    </>
  );
});

export default StaticFooOrBar;
