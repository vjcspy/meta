import drop from 'lodash/drop';
import join from 'lodash/join';

export const getCustomerName = (customer: {
  firstname: string;
  lastname: string;
  middlename: string;
}) => {
  if (!customer) {
    return null;
  }
  return `${customer.lastname} ${customer.firstname}`;
};

export const parseCustomerName = (customerName: string) => {
  const nameAsArray = customerName.split(' ');
  if (Array.isArray(nameAsArray) && nameAsArray.length < 2) {
    console.warn('Customer name invalid');
    return undefined;
  }
  const lastname = nameAsArray[0];
  const firstname = join(drop(nameAsArray), ' ');

  return {
    lastname,
    firstname,
  };
};
