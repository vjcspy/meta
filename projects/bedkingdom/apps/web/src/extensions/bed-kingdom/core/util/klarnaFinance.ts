/* eslint-disable unused-imports/no-unused-vars */
import moment from 'moment/moment';

export const financeProducts = [
  {
    productId: 1,
    productGuid: '244b3e7a-0ffb-41f2-88d5-adf78b6a3d9e',
    name: 'Interest Free Finance (6 Months)',
    minLoan: 250.0,
    maxLoan: 15000.0,
    months: 6,
    monthlyRate: 0.0,
    apr: 0.0,
    serviceFee: 0.0,
    documentFee: 0.0,
    documentFeeCollectionMonth: 0,
    documentFeeMaximum: 0,
    documentFeeMinimum: 0,
    documentFeePercentage: 0.0,
    optionPeriod: 0,
    deferredPeriod: 0,
    tag: 'IFF6',
    altTag: 'ONIF6',
    settlementFee: 0.0,
  },
  {
    productId: 2,
    productGuid: '20125e19-f2c2-42f4-a230-ec668f776296',
    name: 'Interest Free Finance (9 Months)',
    minLoan: 250.0,
    maxLoan: 15000.0,
    months: 9,
    monthlyRate: 0.0,
    apr: 0.0,
    serviceFee: 0.0,
    documentFee: 0.0,
    documentFeeCollectionMonth: 0,
    documentFeeMaximum: 0,
    documentFeeMinimum: 0,
    documentFeePercentage: 0.0,
    optionPeriod: 0,
    deferredPeriod: 0,
    tag: 'IFF9',
    altTag: 'ONIF9',
    settlementFee: 0.0,
  },
  {
    productId: 3,
    productGuid: 'bed9d208-d9c1-4d8e-a29f-decb53fd0b22',
    name: 'Classic Credit 12 Months 14.9%',
    minLoan: 250.0,
    maxLoan: 15000.0,
    months: 12,
    monthlyRate: 0.09773,
    apr: 14.9,
    serviceFee: 0.0,
    documentFee: 0.0,
    documentFeeCollectionMonth: 0,
    documentFeeMaximum: 0,
    documentFeeMinimum: 0,
    documentFeePercentage: 0.0,
    optionPeriod: 0,
    deferredPeriod: 0,
    tag: 'CC12-15.9',
    altTag: 'ONIB12-15.9',
    settlementFee: 0.0,
  },
  {
    productId: 4,
    productGuid: '1401bd54-9a22-4ce7-8f7c-61a3ebb93639',
    name: 'Classic Credit 24 Months 14.9%',
    minLoan: 250.0,
    maxLoan: 15000.0,
    months: 24,
    monthlyRate: 0.047999,
    apr: 14.9,
    serviceFee: 0.0,
    documentFee: 0.0,
    documentFeeCollectionMonth: 0,
    documentFeeMaximum: 0,
    documentFeeMinimum: 0,
    documentFeePercentage: 0.0,
    optionPeriod: 0,
    deferredPeriod: 0,
    tag: 'CC24-15.9',
    altTag: 'ONIB24-15.9',
    settlementFee: 0.0,
  },
  {
    productId: 5,
    productGuid: 'bbe76da6-c60e-4881-83fc-328e415f0a5a',
    name: 'Classic Credit 36 Months 14.9%',
    minLoan: 250.0,
    maxLoan: 15000.0,
    months: 36,
    monthlyRate: 0.034163,
    apr: 14.9,
    serviceFee: 0.0,
    documentFee: 0.0,
    documentFeeCollectionMonth: 0,
    documentFeeMaximum: 0,
    documentFeeMinimum: 0,
    documentFeePercentage: 0.0,
    optionPeriod: 0,
    deferredPeriod: 0,
    tag: 'CC36-15.9',
    altTag: 'ONIB36-15.9',
    settlementFee: 0.0,
  },
];

export const getFinanceProductKlarna = (id: any) => {
  for (let i = 0; i < financeProducts.length; i++) {
    if (
      financeProducts[i].productId == id ||
      financeProducts[i].tag == id ||
      financeProducts[i].altTag == id
    ) {
      return financeProducts[i];
    }
  }
  return null;
};

export const getFinanceProductsKlarna = function () {
  return financeProducts;
};

export const calculateApr = function (
  loan: any,
  instalment: any,
  deferred: any,
  term: any
) {
  let result = 0;
  let high = 200;
  let low = 0;
  let n, x, j, q, y;

  if (deferred > 1) {
    n = term + deferred + 1;
  } else {
    n = term + 1;
  }

  x = 1;

  while (x < 20) {
    result = (high + low) / 2;

    j = Math.pow(1.0 + result / 100.0, 1.0 / 12.0);

    q = 1.0 / j;
    let z = 0;

    if (deferred < 1) {
      y = (instalment * (1.0 - Math.pow(q, n))) / (1 - q) - instalment;

      z = 0.0;
    } else {
      y = (instalment * (1.0 - Math.pow(q, n - 1))) / (1 - q) - instalment;

      z = (instalment * (1.0 - Math.pow(q, deferred))) / (1 - q) - instalment;
    }

    if (y - z < loan) {
      high = result;
    } else {
      low = result;
    }

    x++;
  }

  return result;
};

export const sumCashFlows = (months: any, cashflows: any) => {
  let total = 0.0;

  for (let i = 1; i < months; i++) {
    total = total + parseFloat(cashflows[i - 1].cashFlows);
  }

  return total;
};

export const earliestDate = function (cashflows: any, months: any) {
  let earliest = cashflows[0].dataDate;

  for (let i = 1; i < months; i++) {
    if (moment(cashflows[i].dataDate).isBefore(earliest)) {
      earliest = cashflows[i].dataDate;
    }
  }

  return earliest;
};

export const presentValue = function (
  cashflows: any,
  irr: any,
  loanTerm: any,
  checkdate: any,
  numdays: any
) {
  let presValue = 0.0;

  for (let i = 0; i < loanTerm; i++) {
    const cf = parseFloat(cashflows[i].cashFlows);

    const diff = moment(checkdate).diff(cashflows[i].dataDate, 'days');

    presValue += cf / Math.pow(1 + irr, diff) / numdays;
  }

  return presValue;
};

export const XIRR = function (values: any, dates: any, guess: any) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Calculates the resulting amount
  const irrResult = function (values: any, dates: any, rate: any) {
    const r = rate + 1;
    let result = values[0];
    for (let i = 1; i < values.length; i++) {
      result +=
        values[i] /
        Math.pow(r, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
    }
    return result;
  };

  // Calculates the first derivation
  const irrResultDeriv = function (values: any, dates: any, rate: any) {
    const r = rate + 1;
    let result = 0;
    for (let i = 1; i < values.length; i++) {
      const frac = moment(dates[i]).diff(moment(dates[0]), 'days') / 365;
      result -= (frac * values[i]) / Math.pow(r, frac + 1);
    }
    return result;
  };

  // Check that values contains at least one positive value and one negative value
  let positive = false;
  let negative = false;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!';

  // Initialize guess and resultRate
  guess = typeof guess === 'undefined' ? 0.1 : guess;
  let resultRate = guess;

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10;

  // Set maximum number of iterations
  const iterMax = 50;

  // Implement Newton's method
  let newRate, epsRate, resultValue;
  let iteration = 0;
  let contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate =
      resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
  } while (contLoop && ++iteration < iterMax);

  if (contLoop) return '#NUM!';

  // Return internal rate of return
  return resultRate;
};

export const calculateAprFromIrr = function (
  loan: any,
  monthlyinstalment: any,
  loanTerm: any,
  documentfee: any,
  documentfeecollectionmonth: any
) {
  const startDate = new Date();
  const incomeTable = [];
  const dateTable = [];

  let checkDate;
  const incomeObject = { cashFlows: 0, dataDate: 0 };
  let irr, irrPrev, presentValuePrev, pv;

  if (documentfeecollectionmonth == 0) {
    incomeTable.push(loan * -1 + documentfee);
  } else {
    incomeTable.push(loan * -1);
  }
  dateTable.push(startDate);

  for (let i = 1; i <= loanTerm; i++) {
    const nextDate = moment(startDate).add('M', i);
    dateTable.push(nextDate);

    if (i - 1 == documentfeecollectionmonth && documentfeecollectionmonth > 0) {
      incomeTable.push(parseFloat(monthlyinstalment + documentfee));
    } else {
      incomeTable.push(parseFloat(monthlyinstalment));
    }
  }
  const r = XIRR(incomeTable, dateTable, 0.1);

  return Math.round(r * 10000) / 100;
};

export const calculateFromProductCode = function (
  productCode: any,
  cashPrice: any,
  deposit: any
) {
  return calculateKlarna(
    getFinanceProductKlarna(productCode),
    cashPrice,
    deposit
  );
};

//Calculates all financial parameters
export const calculateKlarna = function (
  financeProduct: any,
  cashPrice: any,
  deposit: any
) {
  const apr = parseFloat(financeProduct.apr);
  const monthlyrate = parseFloat(financeProduct.monthlyRate);
  let calculatedApr;
  const months = parseFloat(financeProduct.months);
  const serviceFee = parseFloat(financeProduct.serviceFee);
  let balancePayable = 0.0;
  let documentFee = 0;

  cashPrice = parseFloat(cashPrice);

  deposit = parseFloat(deposit);

  const loanAmount = cashPrice - deposit;
  let initialPayments, finalPayment;

  balancePayable = loanAmount;

  documentFee =
    financeProduct.documentFee +
    loanAmount * financeProduct.documentFeePercentage;

  if (
    financeProduct.documentFeeMinimum > 0 &&
    documentFee < financeProduct.documentFeeMinimum
  ) {
    documentFee = financeProduct.documentFeeMinimum;
  }
  if (
    financeProduct.documentFeeMaximum > 0 &&
    documentFee > financeProduct.documentFeeMaximum
  ) {
    documentFee = financeProduct.documentFeeMaximum;
  }

  if (monthlyrate == 0) {
    initialPayments = Math.round((loanAmount / months) * 100) / 100;

    if (initialPayments * months < loanAmount) {
      initialPayments += 0.01;
    }

    finalPayment = loanAmount - initialPayments * (months - 1);

    calculatedApr = 0;
  } else {
    const yields = Math.pow(apr / 100 + 1, 1.0 / 12);

    let pv = loanAmount - serviceFee;

    if (financeProduct.deferredPeriod > 1) {
      pv = pv * Math.pow(yields, financeProduct.deferredPeriod - 1);
    }

    initialPayments =
      Math.floor(
        (0 - pv / ((Math.pow(yields, 0 - months) - 1) / (yields - 1))) * 100
      ) /
        100 +
      0.01;

    finalPayment = initialPayments;

    balancePayable = initialPayments * months;

    calculatedApr = calculateApr(
      loanAmount - financeProduct.serviceFee,
      initialPayments,
      financeProduct.deferredPeriod,
      months
    );
  }

  if (documentFee > 0) {
    calculatedApr = calculateAprFromIrr(
      loanAmount,
      initialPayments,
      months,
      documentFee,
      parseFloat(financeProduct.documentFeeCollectionMonth)
    );
  }

  //balancePayable = initialPayments * (months - 1);
  //balancePayable += finalPayment;

  let interest = balancePayable - loanAmount;

  const chargeForCredit = interest + serviceFee + documentFee;

  const amountPayable = balancePayable + serviceFee + documentFee + deposit;

  let productAvailable = true;
  let availabilityReason = '';

  if (loanAmount < financeProduct.minLoan) {
    productAvailable = false;

    availabilityReason =
      'Only available on loan amounts over £' +
      financeProduct.minLoan.toFixed(2);
  } else if (loanAmount > financeProduct.maxLoan) {
    productAvailable = false;

    availabilityReason =
      'Only available on loan amounts under £' +
      financeProduct.maxLoan.toFixed(2);
  }

  interest = initialPayments * months - loanAmount;

  const annualRate =
    ((interest / loanAmount) * 100) /
    ((months + financeProduct.deferredPeriod) / 12);

  const financeCalculation = {
    initialPayments: initialPayments.toFixed(2),
    finalPayment: finalPayment.toFixed(2),
    balancePayable: balancePayable.toFixed(2),
    interest: interest.toFixed(2),
    chargeForCredit: chargeForCredit.toFixed(2),
    amountPayable: amountPayable.toFixed(2),
    cashPrice: cashPrice.toFixed(2),
    deposit: deposit.toFixed(2),
    loanAmount: loanAmount.toFixed(2),
    months: months,
    monthsDeferred: financeProduct.deferredPeriod,
    apr: apr,
    productAvailable: productAvailable,
    availabilityReason: availabilityReason,
    productId: financeProduct.productId,
    productGuid: financeProduct.productGuid,
    name: financeProduct.name,
    settlementFee: financeProduct.settlementFee.toFixed(2),
    serviceFee: serviceFee.toFixed(2),
    documentFee: documentFee.toFixed(2),
    documentFeeMinimum: financeProduct.documentFeeMinimum,
    documentFeeMaximum: financeProduct.documentFeeMaximum,
    documentFeeCollectionMonth: financeProduct.documentFeeCollectionMonth,
    documentFeePercentage: financeProduct.documentFeePercentage,
    annualRate: annualRate.toFixed(2),
  };

  return financeCalculation;
};
