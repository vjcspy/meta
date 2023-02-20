export type InitApolloClientOptions = {
  apiBase: string;
  initialData?: any;
};
/**
 * Apollo options for `Adapter options`
 */
export type WithApolloOptions = {
  apollo: {
    apiBase: string;
    /**
     * Data sau khi extract từ cache
     * */
    initialData?: any;
    /**
     * Client chỉ được pass xuống component khi ở SSR mode
     * */
    client?: any;

    initApolloClient: (options: InitApolloClientOptions) => any;
  };

  [key: string]: any;
};
