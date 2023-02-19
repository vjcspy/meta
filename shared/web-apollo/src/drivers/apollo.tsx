import { ApolloClient, ApolloProvider } from '@apollo/client';
import React from 'react';

import { useApolloClient } from '../hook/use-apollo-client';
import { isSSR } from '@web/base/src/util/isSSR';
import { WithApolloOptions } from '../types/driver';
import { useDebugRender } from '@web/base/src/hook/useDebugRender';
import { CliLogger } from 'chitility/dist/lib/logger/CliLogger';

/**
 *
 * @param PageComponent
 * @param adapterProps
 * @returns {React.ReactElement<any, any> | null}
 */
export const withApollo = (
  PageComponent: any,
  adapterProps: WithApolloOptions
) => {
  const {
    apollo: { apiBase, initApolloClient },
    // @ts-ignore
    ssr = false,
  } = adapterProps;

  const WithApollo: any = (props) => {
    useDebugRender('WithApollo');
    const { apollo, ...pageProps } = props;

    const { client, initPersistent } = useApolloClient({
      ...apollo,
      apiBase,
    });

    if (!initPersistent) {
      // return <UiExtension uiId="LOADING_INDICATOR" global={true} />;
      return <>Loading...</>;
    }

    return (
      <>
        <ApolloProvider client={client}>
          {<PageComponent {...pageProps} />}
        </ApolloProvider>
      </>
    );
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const logger = new CliLogger('WithApollo.getInitialProps');
      // @ts-ignore
      let client: ApolloClient<any> = ctx?.apolloClient;
      if (!client) {
        // Lưu client ở context là một cách rất hay, nó đảm bảo client không bị cache giữa các request
        ctx.apolloClient = client = initApolloClient({ apiBase });

        // will make sure we send the prop as `null` to the browser.
        // @ts-ignore
        client.toJSON = () => null;
      }

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      let initialData: any;

      // Only on the server:
      if (isSSR()) {
        logger.info('ssr: Apollo');
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.writableEnded) {
          logger.warn('writableEnded');
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              '@apollo/client/react/ssr'
            );
            logger.debug('>>> Apollo getDataFromTree');
            await getDataFromTree(
              <ctx.AppTree
                pageProps={{
                  ...pageProps,
                  apollo: { client },
                }}
              />
            );

            // Extract query data from the Apollo store
            initialData = client.cache.extract();
            logger.debug('>>> WithApollo: initialize data process done ! <<<');
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            logger.error(
              'WithApollo: Error while running `getDataFromTree`',
              error
            );
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          // Check thì thấy tự render lại
          // Head.rewind();
        }
      }
      return {
        ...pageProps,
        apollo: { initialData, client },
        ssrComplete: true,
      };
    };
  }

  return WithApollo;
};
