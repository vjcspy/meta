import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useState } from 'react';

const DynamicFooOrBar = combineHOC()(() => {
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
        <UiExtension uiId="DYNAMIC_FOO" />
      ) : (
        <UiExtension uiId="DYNAMIC_BAR" />
      )}
    </>
  );
});

export default DynamicFooOrBar;
