import * as React from 'react';
import { useContext } from 'react';

import type { DomainContextValue } from '../types/domain';

/**
 * Các thông tin liên quan đển domain.
 * Bởi vì mình sẽ dùng chung web cho tất cả các user nên sẽ phải define ra một cách nào đó để biết được hiện tại domain thuộc về shop owner nào
 * @type {React.Context<{userId: string}>}
 */
const DomainContext = React.createContext<DomainContextValue>({
  domainData: {
    shopOwnerId: 'default', // TODO: Cần  phải detect được shopowner id dựa vào domain name
    domain: '',
    websites: [],
  },
  setDomainData: null,
});

export const useDomainContext = (): DomainContextValue =>
  useContext(DomainContext);

export const DomainContextProvider: React.FC<{
  children: any;
  value: DomainContextValue;
}> = (props) => {
  return (
    <DomainContext.Provider value={props.value}>
      {props.children}
    </DomainContext.Provider>
  );
};

DomainContextProvider.displayName = 'DomainContextProvider';
