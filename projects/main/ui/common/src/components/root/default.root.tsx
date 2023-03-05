import { combineHOC, useExtensionForHook } from '@web/ui-extension';
import React from 'react';

const DefaultRoot = combineHOC()(
  React.memo((props) => {
    const Header = useExtensionForHook('header', props);
    const Main = useExtensionForHook('main', props);
    const Footer = useExtensionForHook('footer', props);

    return (
      <>
        <header>{Header}</header>
        <main>{Main}</main>
        <footer>{Footer}</footer>
      </>
    );
  })
);

DefaultRoot.displayName = 'DEFAULT_ROOT';

export default DefaultRoot;
