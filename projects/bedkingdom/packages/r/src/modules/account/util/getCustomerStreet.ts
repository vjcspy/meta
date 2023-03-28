export const getCustomerStreet = (customer: { street: string[] }) => {
  return Array.isArray(customer.street) ? customer.street[0] : undefined;
};
