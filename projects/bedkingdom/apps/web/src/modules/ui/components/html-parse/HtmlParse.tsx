import parse from 'html-react-parser';
import unescape from 'lodash/unescape';
import React from 'react';

const HtmlParse = React.memo<{ html: string }>((props) => {
  if (!props?.html) {
    return null;
  }
  return <>{parse(unescape(props.html))}</>;
});

HtmlParse.displayName = 'HtmlParse';

export default HtmlParse;
