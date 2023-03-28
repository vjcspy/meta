import React, { useContext } from 'react';

import { StoreContextValue } from '../types';

const StoreContext = React.createContext<StoreContextValue>({});
export const useStoreContext = () => useContext(StoreContext);
export const StoreContextProvider: React.FC<{
  children: any;
  value: StoreContextValue }> = (
  props
) => {
  return (
    <StoreContext.Provider value={props.value}>
      {props.children}
    </StoreContext.Provider>
  );
};
StoreContextProvider.displayName = 'StoreContextProvider';
