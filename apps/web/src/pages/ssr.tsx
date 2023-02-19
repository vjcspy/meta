import { NextPage } from 'next';
import { useDebugRender } from '@web/base/src/hook/useDebugRender';
import { CliLogger } from 'chitility/dist/lib/logger/CliLogger';
export const SSR: NextPage<{
  header?: any;
}> = (props) => {
  useDebugRender('SSR Page');
  return <pre>{JSON.stringify(props?.header, undefined, 4)}</pre>;
};

SSR.getInitialProps = (context) => {
  const logger = new CliLogger(SSR!.getInitialProps!.name);
  logger.info('processing with context header', context?.req?.headers);

  return { header: context?.req?.headers };
};
export default SSR;
