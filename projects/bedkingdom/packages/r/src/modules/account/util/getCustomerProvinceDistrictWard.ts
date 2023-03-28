export const getCustomerProvinceDistrictWard = (customer: {
  iz_address_province: string;
  iz_address_district: string;
  iz_address_ward: string;
}) => {
  return `${customer.iz_address_ward}, ${customer.iz_address_district}, ${customer.iz_address_province}`;
};
