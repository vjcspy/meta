import React, { useContext } from 'react';

import type { StoreContextValue } from '../types/store';

const StoreContext = React.createContext<StoreContextValue>({});
export const useStoreContext = () => useContext(StoreContext);
export const StoreContextProvider: React.FC<{
  children: any;
  value: StoreContextValue;
}> = (props) => {
  return (
    <StoreContext.Provider value={props.value}>
      {props.children}
    </StoreContext.Provider>
  );
};
StoreContextProvider.displayName = 'StoreContextProvider';
