import { NextPage } from "next";
import { WebLogger } from "web-base/src/lib/logger/WebLogger";
import { useDebugRender } from "web-base/src/hook/useDebugRender";
export const SSR: NextPage<{
  header?: any;
}> = (props) => {
  useDebugRender("SSR Page");
  return <pre>{JSON.stringify(props?.header, undefined, 4)}</pre>;
};

SSR.getInitialProps = (context) => {
  const logger = new WebLogger(SSR!.getInitialProps!.name);
  logger.info("processing with context header", context?.req?.headers);

  return { header: context?.req?.headers };
};
export default SSR;
