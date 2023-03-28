import join from 'lodash/join';

export const formatCustomerAddress = (address: any) => {
  if (!address) {
    return null;
  }
  return `${address['firstname']} ${address['lastname']},
 ${join(address['street'], ' ')},
  ${address['iz_address_ward']},
  ${address['iz_address_district']},
  ${address['iz_address_province']}
  `;
};
