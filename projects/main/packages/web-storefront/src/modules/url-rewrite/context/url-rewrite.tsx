import React, { useContext } from 'react';

export interface UrlRewriteContextValue {
  urlRewriteData: {
    type?: string;
    id?: any;
    isResolved?: boolean;
    pathname?: string;
    config_data?: any;
    additional_data?: string;
    metadata?: string;
  };
  setUrlRewriteData?: (data: any) => void;
}

const UrlRewriteContext = React.createContext<UrlRewriteContextValue>({
  urlRewriteData: { isResolved: false },
  setUrlRewriteData: () => {
    // EMPTY
  },
});

export const useUrlRewriteContext = (): UrlRewriteContextValue =>
  useContext(UrlRewriteContext);

export const UrlRewriteContextProvider: React.FC<{
  children: any;
  value: UrlRewriteContextValue;
}> = (props) => {
  return (
    <UrlRewriteContext.Provider value={props.value}>
      {props.children}
    </UrlRewriteContext.Provider>
  );
};

UrlRewriteContextProvider.displayName = 'UrlRewriteContextProvider';
