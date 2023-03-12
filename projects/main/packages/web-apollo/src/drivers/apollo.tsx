import type { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { format } from '@web/base';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { isSSR } from '@web/base/dist/util/isSSR';
import React from 'react';

import { useApolloClient } from '../hook/use-apollo-client';
import type { WithApolloOptions } from '../types/driver';

/**
 *
 * @param PageComponent
 * @param adapterOptions
 * @returns {React.ReactElement<any, any> | null}
 */
export const withApollo = (
  PageComponent: any,
  adapterOptions: WithApolloOptions
) => {
  const {
    apollo: { apiBase, initApolloClient },
    ssr = false,
  } = adapterOptions;

  const WithApollo: any = (props: any) => {
    useDebugRender('WithApollo');
    const { apollo, ...pageProps } = props;

    const { client, initPersistent } = useApolloClient(initApolloClient, {
      ...apollo,
      apiBase,
    });

    if (!initPersistent) {
      if (ssr) {
        throw new Error('SSR was be broken');
      }
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
      let initialData: any;
      let pageProps = {};
      let client: ApolloClient<any> = ctx?.apolloClient;

      // Only on the server:
      if (isSSR()) {
        console.info(format.processSSR('Apollo'));

        if (!client) {
          // Lưu client ở context là một cách rất hay, nó đảm bảo client không bị cache giữa các request
          client = initApolloClient({ apiBase });

          // will make sure we send the prop as `null` to the browser.
          // @ts-ignore
          client.toJSON = () => null;
          ctx.apolloClient = client;
        }

        if (PageComponent.getInitialProps) {
          console.log(
            format.important('Apollo run wrapped getInitialProps methods')
          );
          pageProps = await PageComponent.getInitialProps(ctx);
        }

        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.writableEnded) {
          console.warn('writableEnded');
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              '@apollo/client/react/ssr'
            );
            console.info(
              format.important(
                'WithApollo: Render application and getDataFromTree'
              )
            );
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
            console.info(
              format.important('WithApollo: Initialize data process done !')
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error(
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
