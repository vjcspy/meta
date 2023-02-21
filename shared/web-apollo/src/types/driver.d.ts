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
    initApolloClient: (options: InitApolloClientOptions) => any;
  };

  [key: string]: any;
};
