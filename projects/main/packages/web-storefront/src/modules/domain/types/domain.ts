export interface DomainContextValue {
  domainData: {
    shopOwnerId: string; // có thể được hiểu là userId trong chiaki
    domain: string;
    websites?: any[];
    defaultStore?: any;
    stores?: any[];
  };
  setDomainData: any;
}
