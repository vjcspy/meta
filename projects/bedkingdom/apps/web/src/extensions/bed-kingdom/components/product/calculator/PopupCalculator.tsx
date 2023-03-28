/* eslint-disable unused-imports/no-unused-vars */
import { withBedStatusPopupData } from '@extensions/bed-kingdom/hoc/content/withBedStatusPopupData';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment/moment';
import React, { useCallback, useMemo, useState } from 'react';
import Popup from 'reactjs-popup';

import BED_KINGDOM_COMMON from '../../../values/BED_KINGDOM_COMMON';

const calculateApr = (loan: any, instalment: any, deferred: any, term: any) => {
  let result = parseFloat(String(0));
  let high = parseFloat(String(200));
  let low = parseFloat(String(0));
  let n;
  let x;
  let j;
  let q;
  let r;
  let y;
  let z;
  if (deferred > 1) {
    n = term + deferred + 1;
  } else {
    n = term + 1;
  }
  x = 1;
  while (x < 20) {
    result = (high + low) / 2;
    j = parseFloat(String(Math.pow(1.0 + result / 100.0, 1.0 / 12.0)));
    q = parseFloat(String(1.0 / j));
    if (deferred < 1) {
      y = parseFloat(
        String((instalment * (1.0 - Math.pow(q, n))) / (1 - q) - instalment)
      );
      z = parseFloat(String(0.0));
    } else {
      y = parseFloat(
        String((instalment * (1.0 - Math.pow(q, n - 1))) / (1 - q) - instalment)
      );
      z = parseFloat(
        String(
          (instalment * (1.0 - Math.pow(q, deferred))) / (1 - q) - instalment
        )
      );
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
const calculateAprFromIrr = (
  loan: any,
  monthlyinstalment: any,
  loanTerm: any,
  documentfee: any,
  documentfeecollectionmonth: any
) => {
  const startDate = new Date();
  const incomeTable = [];
  const dateTable = [];
  let checkDate;
  const incomeObject = { cashFlows: 0, dataDate: 0 };
  let irr;
  let irrPrev;
  let presentValuePrev;
  let pv;
  if (documentfeecollectionmonth == 0) {
    incomeTable.push(parseFloat(String(loan * -1)) + documentfee);
  } else {
    incomeTable.push(parseFloat(String(loan * -1)));
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

const XIRR = (values: any, dates: any, guess: any) => {
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
  // @ts-ignore
  guess = typeof guess === 'undefined' ? 0.1 : guess;
  let resultRate = guess;

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10;

  // Set maximum number of iterations
  const iterMax = 50;

  // Implement Newton's method
  let newRate;
  let epsRate;
  let resultValue;
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
const getFinanceProduct = (id: any) => {
  let data = {};
  // eslint-disable-next-line consistent-return
  BED_KINGDOM_COMMON.FINANCEPRODUCTSV12.forEach((item) => {
    if (item.productId === id || item.tag === id || item.altTag === id) {
      data = item;
    }
  });
  return data;
};
const getFinanceProductKlara = (id: any) => {
  let data = {};
  // eslint-disable-next-line consistent-return
  BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA.forEach((item) => {
    if (item.productId === id || item.tag === id || item.altTag === id) {
      data = item;
    }
  });
  return data;
};
const PopupCalculator = combineHOC(withBedStatusPopupData)(
  React.memo((props: any) => {
    const [deposits, setDeposits] = useState(30);
    const [activeTab, setActiveTab] = useState('v12');
    const [financeProductId, setFinanceProductId] = useState(
      BED_KINGDOM_COMMON.FINANCEPRODUCTSV12[
        BED_KINGDOM_COMMON.FINANCEPRODUCTSV12?.length - 1
      ]?.productId
    );
    const [financeProducKlaratId, setFinanceProductKlaraId] = useState(
      BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA[
        BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA?.length - 1
      ]?.productId
    );

    const calculate = useCallback(
      (financeProduct: any, cashPrice: any, deposit: any) => {
        const apr = parseFloat(financeProduct.apr);
        const monthlyrate = parseFloat(financeProduct.monthlyRate);
        let calculatedApr;
        const months = parseFloat(financeProduct.months);
        const serviceFee = parseFloat(financeProduct.serviceFee);
        let balancePayable: number;
        let documentFee = 0;
        cashPrice = parseFloat(cashPrice);
        deposit = parseFloat(deposit);
        const loanAmount = cashPrice - deposit;
        let initialPayments;
        let finalPayment;
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
            pv *= Math.pow(yields, financeProduct.deferredPeriod - 1);
          }
          initialPayments =
            Math.floor(
              (0 - pv / ((Math.pow(yields, 0 - months) - 1) / (yields - 1))) *
                100
            ) / 100;
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
            parseFloat(String(documentFee)),
            parseFloat(financeProduct.documentFeeCollectionMonth)
          );
        }
        let interest = balancePayable - loanAmount;
        const chargeForCredit = interest + serviceFee + documentFee;
        const amountPayable =
          balancePayable + serviceFee + documentFee + deposit;
        let productAvailable = true;
        let availabilityReason = '';
        if (loanAmount < financeProduct.minLoan) {
          productAvailable = false;
          availabilityReason = `Only available on loan amounts over £${financeProduct.minLoan.toFixed(
            2
          )}`;
        } else if (loanAmount > financeProduct.maxLoan) {
          productAvailable = false;
          availabilityReason = `Only available on loan amounts under £${financeProduct.maxLoan.toFixed(
            2
          )}`;
        }
        interest = initialPayments * months - loanAmount;
        // eslint-disable-next-line unused-imports/no-unused-vars
        const annualRate =
          ((interest / loanAmount) * 100) /
          ((months + financeProduct.deferredPeriod) / 12);
        // context change value
        // @ts-ignore
        // props?.setPriceRepayments(initialPayments.toFixed(2));
        if (props?.setPriceRepayments && initialPayments.toFixed(2)) {
          props?.setPriceRepayments(initialPayments.toFixed(2));
        }
        const financeCalculation = {
          initialPayments: initialPayments.toFixed(2),
          finalPayment: finalPayment.toFixed(2),
          // balancePayable: balancePayable.toFixed(2),
          // interest: interest.toFixed(2),
          // chargeForCredit: chargeForCredit.toFixed(2),
          amountPayable: amountPayable.toFixed(2),
          // cashPrice: cashPrice.toFixed(2),
          // deposit: deposit.toFixed(2),
          loanAmount: loanAmount.toFixed(2),
          months,
          monthsDeferred: financeProduct.deferredPeriod,
          apr: calculatedApr.toFixed(2),
          productAvailable,
          availabilityReason,
          productId: financeProduct.productId,
          productGuid: financeProduct.productGuid,
          name: financeProduct.name,
          // settlementFee: financeProduct.settlementFee.toFixed(2),
          // serviceFee: serviceFee?.toFixed(2),
          // documentFee: documentFee?.toFixed(2),
          // documentFeeMinimum: financeProduct.documentFeeMinimum,
          // documentFeeMaximum: financeProduct.documentFeeMaximum,
          // documentFeeCollectionMonth: financeProduct.documentFeeCollectionMonth,
          // documentFeePercentage: financeProduct.documentFeePercentage,
          // annualRate: annualRate.toFixed(2),
        };
        return financeCalculation;
      },
      [financeProductId, props?.productDataPrice, deposits]
    );

    const calculateKlara = useCallback(
      (financeProductDataKlara: any, cashPrice: any, deposit: any) => {
        const apr = parseFloat(financeProductDataKlara.apr);
        const monthlyrate = parseFloat(financeProductDataKlara.monthlyRate);
        let calculatedApr;
        const months = parseFloat(financeProductDataKlara.months);
        const serviceFee = parseFloat(financeProductDataKlara.serviceFee);
        let balancePayable: number;
        let documentFee = 0;

        cashPrice = parseFloat(cashPrice);

        deposit = parseFloat(deposit);

        const loanAmount = cashPrice - deposit;
        let initialPayments;
        let finalPayment;

        balancePayable = loanAmount;

        documentFee =
          financeProductDataKlara.documentFee +
          loanAmount * financeProductDataKlara.documentFeePercentage;

        if (
          financeProductDataKlara.documentFeeMinimum > 0 &&
          documentFee < financeProductDataKlara.documentFeeMinimum
        ) {
          documentFee = financeProductDataKlara.documentFeeMinimum;
        }
        if (
          financeProductDataKlara.documentFeeMaximum > 0 &&
          documentFee > financeProductDataKlara.documentFeeMaximum
        ) {
          documentFee = financeProductDataKlara.documentFeeMaximum;
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

          if (financeProductDataKlara.deferredPeriod > 1) {
            pv *= Math.pow(yields, financeProductDataKlara.deferredPeriod - 1);
          }

          initialPayments =
            Math.floor(
              (0 - pv / ((Math.pow(yields, 0 - months) - 1) / (yields - 1))) *
                100
            ) /
              100 +
            0.01;

          finalPayment = initialPayments;

          balancePayable = initialPayments * months;

          calculatedApr = calculateApr(
            loanAmount - financeProductDataKlara.serviceFee,
            initialPayments,
            financeProductDataKlara.deferredPeriod,
            months
          );
        }

        if (documentFee > 0) {
          calculatedApr = calculateAprFromIrr(
            loanAmount,
            initialPayments,
            months,
            parseFloat(String(documentFee)),
            parseFloat(financeProductDataKlara.documentFeeCollectionMonth)
          );
        }

        // balancePayable = initialPayments * (months - 1);
        // balancePayable += finalPayment;

        let interest = balancePayable - loanAmount;

        const chargeForCredit = interest + serviceFee + documentFee;

        const amountPayable =
          balancePayable + serviceFee + documentFee + deposit;

        let productAvailable = true;
        let availabilityReason = '';

        if (loanAmount < financeProductDataKlara.minLoan) {
          productAvailable = false;

          availabilityReason = `Only available on loan amounts over £${financeProductDataKlara.minLoan.toFixed(
            2
          )}`;
        } else if (loanAmount > financeProductDataKlara.maxLoan) {
          productAvailable = false;

          availabilityReason = `Only available on loan amounts under £${financeProductDataKlara.maxLoan.toFixed(
            2
          )}`;
        }

        interest = initialPayments * months - loanAmount;

        const annualRate =
          ((interest / loanAmount) * 100) /
          ((months + financeProductDataKlara.deferredPeriod) / 12);

        const financeCalculation = {
          initialPayments: initialPayments.toFixed(2),
          finalPayment: finalPayment.toFixed(2),
          balancePayable: balancePayable.toFixed(2),
          interest: interest.toFixed(2),
          chargeForCredit: chargeForCredit.toFixed(2),
          amountPayable: amountPayable.toFixed(2),
          // cashPrice: cashPrice.toFixed(2),
          // deposit: deposit.toFixed(2),
          loanAmount: loanAmount.toFixed(2),
          months,
          monthsDeferred: financeProductDataKlara.deferredPeriod,
          apr,
          productAvailable,
          availabilityReason,
          productId: financeProductDataKlara.productId,
          productGuid: financeProductDataKlara.productGuid,
          name: financeProductDataKlara.name,
          // settlementFee: financeProductDataKlara.settlementFee.toFixed(2),
          // serviceFee: serviceFee.toFixed(2),
          // documentFee: documentFee.toFixed(2),
          // documentFeeMinimum: financeProductDataKlara.documentFeeMinimum,
          // documentFeeMaximum: financeProductDataKlara.documentFeeMaximum,
          // documentFeeCollectionMonth:
          //   financeProductDataKlara.documentFeeCollectionMonth,
          // documentFeePercentage: financeProductDataKlara.documentFeePercentage,
          // annualRate: annualRate.toFixed(2),
        };

        return financeCalculation;
      },
      [financeProducKlaratId, props?.productDataPrice]
    );

    const paymentCalculator: any = useMemo(() => {
      const financeProductData = getFinanceProduct(financeProductId); // get the object
      let deposit =
        parseInt(String(Math.ceil(props?.productDataPrice * deposits))) / 100; // 9/1/2018 V12
      deposit = parseFloat(deposit.toFixed(2)); // 9/1/2018 V12

      let payments = {};
      if (financeProductData && props?.productDataPrice && deposit) {
        payments = calculate(
          financeProductData,
          props?.productDataPrice,
          deposit
        );
      }
      return payments;
    }, [financeProductId, props?.productDataPrice, deposits]);
    const paymentCalculatorKlara = useMemo<any>(() => {
      const financeProductDataKlara = getFinanceProductKlara(
        financeProducKlaratId
      ); // get the object

      let payments = {};
      if (financeProductDataKlara && props?.productDataPrice) {
        payments = calculateKlara(
          financeProductDataKlara,
          props?.productDataPrice,
          0
        );
      }
      return payments;
    }, [financeProducKlaratId, props?.productDataPrice]);

    return (
      <Popup
        trigger={props?.itemDiv}
        className="popup orderConfirm"
        position="top center"
        modal
        onOpen={() => {
          props?.actions?.setIsOpenPopupActions(true);
        }}
        onClose={() => {
          props?.actions?.setIsOpenPopupActions(false);
        }}
      >
        {
          // @ts-ignore
          (close: any) => (
            <>
              <div className="head-popup">
                <button
                  className="popup-action-close right"
                  type="button"
                  onClick={() => {
                    close();
                    props?.actions?.setIsOpenPopupActions(false);
                  }}
                >
                  <span className="hidden">Close</span>
                </button>
              </div>
              <div className="content-popup popup-orderConfirm">
                <div className="content-inner">
                  <div className="b-klarna-tabs">
                    <div
                      className={`b-item-main v12 cursor-pointer ${
                        activeTab === 'v12' && 'active'
                      }`}
                    >
                      <a
                        className="b-switch"
                        // href="#b-v12-finance"
                        onClick={() => {
                          setActiveTab('v12');
                        }}
                      >
                        <span>V12 Finace</span>
                      </a>
                    </div>
                    <div
                      className={`b-item-main klarna cursor-pointer ${
                        activeTab === 'klarna' && 'active'
                      }`}
                    >
                      <a
                        className="b-switch"
                        // href="#b-tab-klarna"
                        onClick={() => {
                          setActiveTab('klarna');
                        }}
                      >
                        <span>Klarna</span>
                      </a>
                    </div>
                    <div
                      className={`b-item-main clearpay cursor-pointer ${
                        activeTab === 'clearpay' && 'active'
                      }`}
                    >
                      <a
                        className="b-switch"
                        // href="#b-tab-clearpay"
                        onClick={() => {
                          setActiveTab('clearpay');
                        }}
                      >
                        <span>Clearpay</span>
                      </a>
                    </div>
                  </div>
                  <div
                    id="b-v12-finance"
                    className={`b-finance-popup-content  ${
                      activeTab === 'v12' && 'active'
                    }`}
                  >
                    <img
                      className="b-finance-logo"
                      src="data:image/png;base64,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"
                      alt="v12"
                    />
                    <div className="b-finance-popup-title">
                      <span>
                        <strong>INTEREST FREE CREDIT (0% APR)</strong> up to 9
                        months
                      </span>
                    </div>
                    <h3>Choose your Deposit Amount</h3>
                    <div className="b-finance-deposit-list">
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={10}
                      />
                      <label
                        className={`${deposits === 10 && 'active'}`}
                        htmlFor="b-finance-deposit10"
                        title="10%"
                        onClick={() => {
                          setDeposits(10);
                        }}
                      >
                        <span>10%</span>
                      </label>
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={20}
                      />
                      <label
                        className={`${deposits === 20 && 'active'}`}
                        htmlFor="b-finance-deposit20"
                        title="20%"
                        onClick={() => {
                          setDeposits(20);
                        }}
                      >
                        <span>20%</span>
                      </label>
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={30}
                      />
                      <label
                        className={`${deposits === 30 && 'active'}`}
                        htmlFor="b-finance-deposit30"
                        title="30%"
                        onClick={() => {
                          setDeposits(30);
                        }}
                      >
                        <span>30%</span>
                      </label>
                    </div>
                    <h3>Choose your Repayment Term (months)</h3>
                    <div className="b-finance-product-list">
                      {BED_KINGDOM_COMMON.FINANCEPRODUCTSV12.map((item) => (
                        <React.Fragment key={JSON.stringify(item?.productId)}>
                          <input
                            type="radio"
                            name="b-finance-product v12finance-product"
                            id={`v12finance-product${item?.productId}`}
                            defaultValue={item?.productId}
                          />
                          <label
                            htmlFor={`v12finance-product${item?.productId}`}
                            className={`${
                              financeProductId === item?.productId && 'active'
                            }`}
                            title={item?.name}
                            onClick={() => {
                              setFinanceProductId(item?.productId);
                            }}
                          >
                            {item?.months} / <span>{item?.apr}%</span>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="b-finance-calculator-information-popup b-finance-product-page">
                      <div className="b-finance-breakdown">
                        <p className="b-finance-loan">
                          This is a loan of{' '}
                          <span>£{paymentCalculator?.loanAmount}</span> with no
                          deposit{' '}
                        </p>
                        {paymentCalculator?.initialPayments !==
                          paymentCalculator?.finalPayment &&
                        paymentCalculator?.finalPayment > 0 ? (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculator?.months - 1}</span> monthly
                            repayments of{' '}
                            <span> £{paymentCalculator?.initialPayments}</span>{' '}
                            and a final payment of
                            <span> £{paymentCalculator?.finalPayment}</span>
                          </p>
                        ) : (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculator?.months}</span> monthly
                            repayments of{' '}
                            <span> £{paymentCalculator?.initialPayments}</span>
                          </p>
                        )}
                        {paymentCalculator?.documentFee > 0 && (
                          <>
                            {paymentCalculator?.documentFeeCollectionMonth ===
                            0 ? (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>{paymentCalculator?.documentFee}</span> is
                                payable on approval
                              </p>
                            ) : (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>{paymentCalculator?.documentFee}</span> is
                                payable with first instalment
                              </p>
                            )}
                          </>
                        )}
                        <p className="b-finance-document-fee" />
                        <p>
                          Total amount repayable{' '}
                          <span className="b-finance-total-repayable">
                            £{paymentCalculator?.amountPayable}
                          </span>
                        </p>
                        <p>
                          APR{' '}
                          <span className="b-finance-interest">
                            {paymentCalculator?.apr}%
                          </span>{' '}
                          representative
                        </p>
                      </div>
                    </div>
                    <div className="b-lowestMonthlyPayments">
                      <button
                        title="Click to select the finance product with the lowest monthly repayment"
                        onClick={() => {
                          setDeposits(30);
                          setFinanceProductId(
                            BED_KINGDOM_COMMON.FINANCEPRODUCTSV12[
                              BED_KINGDOM_COMMON.FINANCEPRODUCTSV12?.length - 1
                            ]?.productId
                          );
                        }}
                      >
                        Lowest Monthly Repayment
                      </button>
                    </div>
                    <span className="b-finance-popup-note">
                      To pay via finance select <strong>V12Finance</strong> pay
                      later at the checkout page
                    </span>
                  </div>
                  <div
                    id="b-tab-klarna"
                    className={`b-finance-popup-content klarna ${
                      activeTab === 'klarna' && 'active'
                    }`}
                  >
                    <img
                      className="b-finance-logo"
                      src="data:image/png;base64,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"
                      alt="v12"
                    />
                    <div className="b-finance-popup-title">
                      <span>
                        <strong>INTEREST FREE CREDIT (0% APR)</strong> up to 9
                        months
                      </span>
                    </div>
                    <h3>Choose your Repayment Term (months)</h3>
                    <div className="b-finance-product-list">
                      {BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA.map((item) => (
                        <React.Fragment key={JSON.stringify(item?.productId)}>
                          <input
                            type="radio"
                            name="b-finance-product v12finance-product"
                            id={`v12finance-product${item?.productId}`}
                            defaultValue={item?.productId}
                          />
                          <label
                            htmlFor={`v12finance-product${item?.productId}`}
                            className={`${
                              financeProducKlaratId === item?.productId &&
                              'active'
                            }`}
                            title={item?.name}
                            onClick={() => {
                              setFinanceProductKlaraId(item?.productId);
                            }}
                          >
                            {item?.months} / <span>{item?.apr}%</span>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="b-finance-calculator-information-popup b-finance-product-page">
                      <div className="b-finance-breakdown">
                        <p className="b-finance-loan">
                          This is a loan of{' '}
                          <span>£{paymentCalculatorKlara?.loanAmount}</span>{' '}
                          with no deposit{' '}
                        </p>
                        {paymentCalculatorKlara?.initialPayments !==
                          paymentCalculatorKlara?.finalPayment &&
                        paymentCalculatorKlara?.finalPayment > 0 ? (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculatorKlara?.months - 1}</span>{' '}
                            monthly repayments of{' '}
                            <span>
                              {' '}
                              £{paymentCalculatorKlara?.initialPayments}
                            </span>{' '}
                            and a final payment of
                            <span>
                              {' '}
                              £{paymentCalculatorKlara?.finalPayment}
                            </span>
                          </p>
                        ) : (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculatorKlara?.months}</span>{' '}
                            monthly repayments of{' '}
                            <span>
                              {' '}
                              £{paymentCalculatorKlara?.initialPayments}
                            </span>
                          </p>
                        )}
                        {paymentCalculatorKlara?.documentFee > 0 && (
                          <>
                            {paymentCalculatorKlara?.documentFeeCollectionMonth ===
                            0 ? (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>
                                  {paymentCalculatorKlara?.documentFee}
                                </span>{' '}
                                is payable on approval
                              </p>
                            ) : (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>
                                  {paymentCalculatorKlara?.documentFee}
                                </span>{' '}
                                is payable with first instalment
                              </p>
                            )}
                          </>
                        )}
                        <p className="b-finance-document-fee" />
                        <p>
                          Total amount repayable{' '}
                          <span className="b-finance-total-repayable">
                            £{paymentCalculatorKlara?.amountPayable}
                          </span>
                        </p>
                        <p>
                          APR{' '}
                          <span className="b-finance-interest">
                            {paymentCalculatorKlara?.apr}%
                          </span>{' '}
                          representative
                        </p>
                      </div>
                    </div>
                    <div className="klarna-landing-pages">
                      <h6>
                        Representative example of interest incurred if you miss
                        a repayment
                      </h6>
                      <div className="slice-example">
                        <div className="representative">
                          <p>Representative (Variable)</p>
                          <p>18.9% APR</p>
                        </div>
                        <div className="representative">
                          <p>Purchase Interest Rate</p>
                          <p>18.9% p.a.</p>
                        </div>
                        <div className="representative">
                          <p>Assumed Credit Limit</p>
                          <p>£ 1,200</p>
                        </div>
                      </div>
                    </div>
                    <div className="b-lowestMonthlyPayments">
                      <button
                        title="Click to select the finance product with the lowest monthly repayment"
                        onClick={() => {
                          setFinanceProductKlaraId(
                            BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA[
                              BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA?.length -
                                1
                            ]?.productId
                          );
                        }}
                      >
                        Lowest Monthly Repayment
                      </button>
                    </div>
                    <span className="b-finance-popup-note">
                      To pay via finance select <strong>Klarna</strong> pay
                      later at the checkout page
                    </span>
                  </div>
                  <div
                    id="b-tab-clearpay"
                    className={`b-finance-popup-content clearpay ${
                      activeTab === 'clearpay' && 'active'
                    }`}
                  >
                    <img
                      className="b-finance-logo"
                      src="data:image/png;base64,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"
                      alt="v12"
                    />
                    <div className="b-finance-popup-title">
                      <span>
                        <strong>INTEREST FREE CREDIT (0% APR)</strong> up to 9
                        months
                      </span>
                    </div>
                    <h3>Choose your Deposit Amount</h3>
                    <div className="b-finance-deposit-list">
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={10}
                      />
                      <label
                        className={`${deposits === 10 && 'active'}`}
                        htmlFor="b-finance-deposit10"
                        title="10%"
                        onClick={() => {
                          setDeposits(10);
                        }}
                      >
                        <span>10%</span>
                      </label>
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={20}
                      />
                      <label
                        className={`${deposits === 20 && 'active'}`}
                        htmlFor="b-finance-deposit20"
                        title="20%"
                        onClick={() => {
                          setDeposits(20);
                        }}
                      >
                        <span>20%</span>
                      </label>
                      <input
                        type="radio"
                        name="b-finance-deposit"
                        defaultValue={30}
                      />
                      <label
                        className={`${deposits === 30 && 'active'}`}
                        htmlFor="b-finance-deposit30"
                        title="30%"
                        onClick={() => {
                          setDeposits(30);
                        }}
                      >
                        <span>30%</span>
                      </label>
                    </div>
                    <h3>Choose your Repayment Term (months)</h3>
                    <div className="b-finance-product-list">
                      {BED_KINGDOM_COMMON.FINANCEPRODUCTSV12.map((item) => (
                        <React.Fragment key={JSON.stringify(item?.productId)}>
                          <input
                            type="radio"
                            name="b-finance-product v12finance-product"
                            id={`v12finance-product${item?.productId}`}
                            defaultValue={item?.productId}
                          />
                          <label
                            htmlFor={`v12finance-product${item?.productId}`}
                            className={`${
                              financeProductId === item?.productId && 'active'
                            }`}
                            title={item?.name}
                            onClick={() => {
                              setFinanceProductId(item?.productId);
                            }}
                          >
                            {item?.months} / <span>{item?.apr}%</span>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="b-finance-calculator-information-popup b-finance-product-page">
                      <div className="b-finance-breakdown">
                        <p className="b-finance-loan">
                          This is a loan of{' '}
                          <span>£{paymentCalculator?.loanAmount}</span> with no
                          deposit{' '}
                        </p>
                        {paymentCalculator?.initialPayments !==
                          paymentCalculator?.finalPayment &&
                        paymentCalculator?.finalPayment > 0 ? (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculator?.months - 1}</span> monthly
                            repayments of{' '}
                            <span> £{paymentCalculator?.initialPayments}</span>{' '}
                            and a final payment of
                            <span> £{paymentCalculator?.finalPayment}</span>
                          </p>
                        ) : (
                          <p className="b-finance-repayable">
                            Repayable by{' '}
                            <span>{paymentCalculator?.months}</span> monthly
                            repayments of{' '}
                            <span> £{paymentCalculator?.initialPayments}</span>
                          </p>
                        )}
                        {paymentCalculator?.documentFee > 0 && (
                          <>
                            {paymentCalculator?.documentFeeCollectionMonth ===
                            0 ? (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>{paymentCalculator?.documentFee}</span> is
                                payable on approval
                              </p>
                            ) : (
                              <p className="b-finance-repayable">
                                An arrangement fee of{' '}
                                <span>{paymentCalculator?.documentFee}</span> is
                                payable with first instalment
                              </p>
                            )}
                          </>
                        )}
                        <p className="b-finance-document-fee" />
                        <p>
                          Total amount repayable{' '}
                          <span className="b-finance-total-repayable">
                            £{paymentCalculator?.amountPayable}
                          </span>
                        </p>
                        <p>
                          APR{' '}
                          <span className="b-finance-interest">
                            {paymentCalculator?.apr}%
                          </span>{' '}
                          representative
                        </p>
                      </div>
                    </div>
                    <div className="b-lowestMonthlyPayments">
                      <button
                        title="Click to select the finance product with the lowest monthly repayment"
                        onClick={() => {
                          setDeposits(30);
                          setFinanceProductId(
                            BED_KINGDOM_COMMON.FINANCEPRODUCTSV12[
                              BED_KINGDOM_COMMON.FINANCEPRODUCTSV12?.length - 1
                            ]?.productId
                          );
                        }}
                      >
                        Lowest Monthly Repayment
                      </button>
                    </div>
                    <span className="b-finance-popup-note">
                      To pay via finance select <strong>V12Finance</strong> pay
                      later at the checkout page
                    </span>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </Popup>
    );
  })
);
export default PopupCalculator;
