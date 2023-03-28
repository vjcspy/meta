import React, { useContext } from 'react';

export interface UiContextValue {
  readonly themeName: string;
  readonly uiConfig: any;
  readonly performance?: any;
  setValue?: (config: any) => void;
}

const UiContext = React.createContext<UiContextValue>({
  themeName: 'default',
  uiConfig: {},
});

export const useUiContext = () => useContext(UiContext);

export const UiContextProvider: React.FC<{
  children: any;
  value: UiContextValue;
}> = (props) => {
  return (
    <UiContext.Provider value={props.value}>
      {props.children}
    </UiContext.Provider>
  );
};
