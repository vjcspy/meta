import {
  calculateKlarna,
  getFinanceProductKlarna,
  getFinanceProductsKlarna,
} from '@extensions/bed-kingdom/core/util/klarnaFinance';
import {
  calculate,
  getFinanceProduct,
  getFinanceProducts,
} from '@extensions/bed-kingdom/core/util/v12Finance';
import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const Finance = combineHOC()(() => {
  const [tabActive, setTabActive] = useState('v12');
  const [tabActiveKlarna, setTabActiveKlarna] = useState('later');
  const [v12Cash, setV12Cash] = useState<any>(2000);
  const [klanarCash, setKlanarCash] = useState<any>(2000);
  const [klanarDeposit, setKlanarDeposit] = useState<any>(0);
  const [v12Deposit, setV12Deposit] = useState<any>(0);
  const [v12SelectedMonth, setV12SelectedMonth] = useState<any>(null);
  const [listSelectMonth, setListSelectMonth] = useState<any>([]);
  const [listProducts, setListProducts] = useState<any>([]);
  const [v12Payments, setV12Payments] = useState<any>({});
  const [klanarPayments, setKlanarPayments] = useState<any>({});
  const [financeProducKlaratId, setFinanceProductKlaraId] = useState(
    BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA[
      BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA?.length - 1
    ]?.productId
  );

  useEffect(() => {
    // @ts-ignore
    const products = getFinanceProducts();
    if (Array.isArray(products)) {
      const listProductId: any = [];
      products.forEach((item: any) => {
        listProductId.push({
          name: item?.name,
          productId: item?.productId,
        });
      });

      setListSelectMonth(listProductId);
      setListProducts(products);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (Array.isArray(listSelectMonth) && listSelectMonth.length > 0) {
      setV12SelectedMonth(listSelectMonth[0]?.productId);
      calculateRepayments(listSelectMonth[0]?.productId);
    }
    calculateRepaymentsKlarna(financeProducKlaratId);
  }, [listSelectMonth, financeProducKlaratId]);

  useEffect(() => {
    calculateRepayments(v12SelectedMonth);
  }, [v12Deposit, v12Cash, v12SelectedMonth]);

  useEffect(() => {
    calculateRepaymentsKlarna(financeProducKlaratId);
  }, [klanarCash, klanarDeposit, financeProducKlaratId]);

  const getLowestMonthlyPayments = useCallback(() => {
    // @ts-ignore
    const products = getFinanceProducts();

    let lowestMonthlyPayment: any = 0;
    let lowestMonthlyPaymentProductId: any = 0;

    products.forEach((item: any) => {
      const product: any = getFinanceProduct(item.productId);

      let deposit = parseInt(String(Math.ceil(v12Cash * v12Deposit))) / 100; // 9/1/2018 V12

      deposit = deposit ? parseFloat(deposit.toFixed(2)) : 0; // 9/1/2018 V12
      // @ts-ignore
      const payments = calculate(product, v12Cash, deposit);
      const monthlyPayment = payments?.initialPayments || 0;

      if (
        // @ts-ignore
        parseFloat(String(lowestMonthlyPayment)) > parseFloat(monthlyPayment) ||
        lowestMonthlyPayment == 0
      ) {
        lowestMonthlyPayment = payments.initialPayments;
        lowestMonthlyPaymentProductId = product.productId;
      }
    });

    setV12SelectedMonth(lowestMonthlyPaymentProductId);
    calculateRepayments(lowestMonthlyPaymentProductId);
  }, [listProducts, v12Deposit, v12Cash]);

  const calculateRepayments = useCallback(
    (productIdAtive?: any) => {
      const productId = productIdAtive ?? v12SelectedMonth; // selected product
      // @ts-ignore
      const financeProduct = getFinanceProduct(productId); // get the object
      //	var deposit = cashPrice * (depositFactor / 100);					// 9/1/2018 V12
      let deposit = parseInt(String(Math.ceil(v12Cash * v12Deposit))) / 100; // 9/1/2018 V12
      deposit = parseFloat(deposit.toFixed(2)); // 9/1/2018 V12

      // @ts-ignore
      const payments = calculate(financeProduct, v12Cash, deposit);

      setV12Payments(payments);
    },
    [v12SelectedMonth, v12Deposit, v12Cash]
  );

  const getLowestMonthlyPaymentsKlarnaKlarna = useCallback(() => {
    const products = getFinanceProductsKlarna();

    let lowestMonthlyPayment: any = 0;
    let lowestMonthlyPaymentProductId: any = 0;

    for (let i = 0; i < products.length; i++) {
      const product = getFinanceProductKlarna(products[i].productId);
      // 9/1/2018 Klarna
      let depositKlarna = Math.ceil(klanarCash * klanarDeposit) / 100; // 9/1/2018 Klarna
      depositKlarna = parseFloat(depositKlarna.toFixed(2)); // 9/1/2018 Klarna

      const payments = calculateKlarna(
        product,
        klanarCash,
        financeProducKlaratId
      );
      const monthlyPayment = payments.initialPayments;

      if (
        parseFloat(lowestMonthlyPayment) > parseFloat(monthlyPayment) ||
        lowestMonthlyPayment == 0
      ) {
        lowestMonthlyPayment = payments.initialPayments;
        lowestMonthlyPaymentProductId = product?.productId;
      }
    }

    setFinanceProductKlaraId(lowestMonthlyPaymentProductId);
    calculateRepaymentsKlarna(lowestMonthlyPaymentProductId);
  }, [financeProducKlaratId, klanarCash, klanarDeposit]);

  const calculateRepaymentsKlarna = useCallback(
    (productIdActive: any) => {
      const productId = productIdActive;
      const financeProduct = getFinanceProductKlarna(productId); // get the object
      //	var depositKlarna = cashPriceKlarna * (depositKlarnaFactor / 100);					// 9/1/2018 Klarna
      let depositKlarna = Math.ceil(klanarCash * klanarDeposit) / 100; // 9/1/2018 Klarna
      depositKlarna = parseFloat(depositKlarna.toFixed(2)); // 9/1/2018 Klarna

      const payments = calculateKlarna(
        financeProduct,
        klanarCash,
        depositKlarna
      );

      setKlanarPayments(payments);
    },
    [klanarCash, klanarDeposit]
  );

  return (
    <div className="klarna-landing-pages">
      <div className="klarna-landing-content container ml-auto mr-auto mt-5">
        <div className="klarna-tabs w-full ml-auto mr-auto inline-block">
          <div
            className={clsx(
              'item-main v12 cursor-pointer',
              tabActive === 'v12' && 'active'
            )}
            onClick={() => setTabActive('v12')}
          >
            <span className="switch" data-toggle="trigger">
              <span>V12 Finace</span>
            </span>
          </div>
          <div
            className={clsx(
              'item-main klarna cursor-pointer',
              tabActive === 'klarna' && 'active'
            )}
            onClick={() => setTabActive('klarna')}
          >
            <span className="switch" data-toggle="trigger">
              <span>Klarna</span>
            </span>
          </div>
        </div>
        {tabActive === 'v12' && (
          <div className="klarna-contents">
            <div id="tab-v12-finance" className="item content">
              <div className="cms-pay_finance">
                <div className="page-main">
                  <div className="serviceContent">
                    <div>
                      <ul>
                        <li>The flexible, affordable way to pay</li>
                        <li>10% deposit required</li>
                        <li>
                          First installment 30 days after you recieve your
                          delivery
                        </li>
                      </ul>
                    </div>
                    <p className="intro">
                      We know a new Bed is an investment, whether your old one
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      has broken or you're kitting out a new home. That's why we
                      offer the option to Pay on Finance. If you spend
                      £279&nbsp;or more online, you can choose to spread the
                      cost of your purchase over a time to suit you, whether
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      it's 6 ,9 ,12, 24 or 36 months. Just select the Pay on
                      Finance option when you check out.
                    </p>
                    <h2>0% interest on all orders over £349</h2>
                    <p>
                      We offer up to 9 months interest free credit on all orders
                      over 349
                    </p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h2>It's as easy as:</h2>
                    <ul className="steps">
                      <li>Add your products</li>
                      <li>
                        Select Pay on Finance
                        <br />
                        at checkout
                      </li>
                      <li>
                        Complete the easy
                        <br />
                        application
                      </li>
                    </ul>
                    <h2>Representative Example</h2>
                    <p>
                      We want our Pay on Finance option to be as easy to
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      understand and straightforward as possible. We've created
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      the chart below to tell you how much you'll pay back per
                      month. On selected products, Interest Free and Buy Now Pay
                      Later payment options will be available as part of
                      specific promotions.
                    </p>
                    <div className="body">
                      <div className="header">Loan Calculator</div>
                      <div className="section">
                        Use this calculator to see which finance option suits
                        your purchase.
                      </div>
                      <div className="section">
                        <label>Cash Price (£):</label>{' '}
                        <input
                          type="text"
                          id="cashPrice"
                          value={v12Cash}
                          onChange={(event) => {
                            setV12Cash(parseInt(event.target.value));
                          }}
                        />
                        <br />
                        <input
                          type="range"
                          id="cpRange"
                          min={250}
                          max={15000}
                          value={v12Cash}
                          onChange={(event) => {
                            setV12Cash(event.target.value);
                          }}
                        />
                      </div>
                      <div className="section">
                        <label>Deposit (%):</label>{' '}
                        <input
                          type="text"
                          maxLength={2}
                          id="deposit"
                          value={v12Deposit}
                          onChange={(event) => {
                            setV12Deposit(event.target.value);
                          }}
                        />
                        <br />
                        <input
                          type="range"
                          id="depRange"
                          min={0}
                          max={99}
                          value={v12Deposit}
                          onChange={(event) => {
                            setV12Deposit(parseInt(event.target.value));
                          }}
                        />
                      </div>
                      <div className="section">
                        Finance is subject to status. Terms and conditions
                        apply.
                      </div>
                      <div className="section">
                        {Array.isArray(listSelectMonth) &&
                          listSelectMonth.length > 0 && (
                            <select
                              id="productsList"
                              value={v12SelectedMonth || ''}
                              onChange={(event: any) => {
                                setV12SelectedMonth(event.target.value);
                              }}
                            >
                              {Array.isArray(listSelectMonth) &&
                                listSelectMonth.length > 0 &&
                                listSelectMonth.map((mon: any) => (
                                  <option
                                    value={mon?.productId}
                                    key={mon?.productId}
                                  >
                                    {mon?.name}
                                  </option>
                                ))}
                            </select>
                          )}
                      </div>
                      <div className="breakdown">
                        {v12Payments?.deposit == 0 ? (
                          <label id="lblLoan">
                            This is a loan of &pound; {v12Payments.loanAmount}{' '}
                            with no deposit.{' '}
                          </label>
                        ) : (
                          <label id="lblLoan">
                            This is a loan of &pound; {v12Payments.loanAmount}{' '}
                            with &pound;{v12Payments.deposit} deposit.{' '}
                          </label>
                        )}
                        {v12Payments.initialPayments !=
                          v12Payments.finalPayment &&
                        v12Payments.finalPayment > 0 ? (
                          <label id="lblRepayable">
                            Repayable by {v12Payments.months - 1} monthly
                            repayments of &pound;{v12Payments.initialPayments}{' '}
                            and a final payment of &pound;
                            {v12Payments.finalPayment}.
                          </label>
                        ) : (
                          <label id="lblRepayable">
                            Repayable by {v12Payments.months} monthly repayments
                            of &pound;{v12Payments.initialPayments}.
                          </label>
                        )}
                        {v12Payments.documentFeeCollectionMonth > 0 && (
                          <>
                            {v12Payments.documentFeeCollectionMonth == 0 ? (
                              <label id="lblDocumentFee">
                                An arrangement fee of &pound;{' '}
                                {v12Payments.documentFee} is payable on
                                approval.
                              </label>
                            ) : (
                              <label id="lblDocumentFee">
                                An arrangement fee of &pound;
                                {v12Payments.documentFee} is payable with first
                                instalment.
                              </label>
                            )}
                          </>
                        )}
                        Total amount repayable{' '}
                        <label id="lblTotalRepayable">
                          £{v12Payments.amountPayable}
                        </label>
                        . APR <label id="lblInterest">{v12Payments.apr}</label>%{' '}
                        representative.
                      </div>
                      <div
                        className="section text-center mb-2"
                        id="lowestMonthlyPayments"
                      >
                        <button
                          title="Click"
                          className="btn bg-main-DDDDDD rounded-3 pt-2 pb-2  h-33px ml-auto mr-auto text-14px font-normal pl-4 pr-4"
                          onClick={() => getLowestMonthlyPayments()}
                        >
                          Lowest Monthly Repayment
                        </button>
                      </div>
                    </div>
                    <div className="serviceContent" />
                    <p>&nbsp;</p>
                    <h2>Finance Terms and Conditions</h2>
                    <p>
                      If your application is successful, you’ll be asked to
                      verify your identity by authorising a 50p transaction
                      against a credit or debit card that you own. This helps
                      protect you and us against fraudulent finance contracts.
                      No money will be taken from your card, the details are
                      only used to check that they are valid and registered to
                      your address.
                    </p>
                    <p>
                      Pay on Finance for interest-bearing credit products is
                      available over 12, 24 or 36 months, subject to status.
                      From time to time, we may offer an interest-free credit
                      product over 6 or 12 month terms, at our discretion. To be
                      eligible to apply for finance, you must be 18 or older, in
                      regular employment and have been a UK resident for more
                      than 3 years. Other conditions may apply and we cannot
                      guarantee that your application will be accepted. Stock
                      will not be allocated until the application has been
                      completed and approved. We reserve the right to withdraw
                      finance on certain products at any time. Pay on Finance is
                      provided through our external partner, V12. If your
                      application is successful you will enter into a Credit
                      Agreement with Secure Trust Bank Plc, who is V12’s parent
                      company.
                    </p>
                    <p>
                      <strong>
                        Should you cancel your credit agreement and have already
                        received products from us, then you will be liable to
                        pay us in full for the product (unless your cancellation
                        rights apply).
                      </strong>
                    </p>
                    <p>
                      Buy Now Pay Later and Interest Free finance options will
                      be available on selected products as part of a specific
                      promotion. These promotions are subject to availability
                      and can be withdrawn at any time.
                    </p>
                    <h2>FAQs</h2>
                    <p className="question first">
                      Who is eligible to apply for finance?
                    </p>
                    <p>
                      Finance is available on orders of £279 or more, placed on
                      our website. This amount includes any additional services
                      and delivery options selected, however does not take into
                      account any promotions, such as cashback.
                    </p>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>You'll need to be:</p>
                    <ul>
                      <li>18 years or older.</li>
                      <li>
                        A UK resident for 3 years or more/Permanent UK resident.
                      </li>
                      <li>Able to make regular repayments by Direct Debit.</li>
                      <li>
                        In regular employment (minimum of 16 hours per week)
                        including self-employment, or in a permanent residence
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        with your spouse/partner who's in regular employment*
                      </li>
                      <li>
                        Have a debit card or credit card in your name and
                        registered to your address and have a bank or building
                        society current account.
                        <p>&nbsp;</p>
                      </li>
                    </ul>
                    <p>
                      Other conditions may apply and we cannot guarantee that
                      your application will be accepted.
                    </p>
                    <p>
                      * If you are retired and receive a pension, or registered
                      disabled and unable to work, V12 Retail Finance may ask
                      for proof of sufficient income.
                    </p>
                    <p className="question">How long will it take to apply?</p>
                    <p>
                      You should get an instant answer on whether your
                      application for finance has been successful. In some
                      cases, V12 – our 3rd party financial services provider -
                      will need to look at the application in more detail before
                      making their decision.
                    </p>
                    <p className="question">What do I need to apply?</p>
                    <p>
                      All you need to do is fill out the online form at the
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      payment stage and add an electronic signature. It's
                      important you use your full name and address details and
                      make sure everything is spelt correctly. Please note, this
                      is an online only finance option.
                    </p>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      If your application is successful, you'll be asked to
                      verify your identity by authorising a 50p transaction
                      against a credit or debit card that you own. This helps
                      protect you and us against fraudulent finance contracts.
                      No money will be taken from your card; the details are
                      only used to check that they are valid and registered to
                      your address.
                    </p>
                    <p className="question">
                      What happens if my application is turned down?
                    </p>
                    <p>
                      Applications may not be accepted for a number of reasons,
                      including mis-typed information, or not meeting the
                      specified requirements. Please note that other conditions
                      may apply and we cannot guarantee that your application
                      will be accepted.
                    </p>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      If your application isn't successful, you can still
                      purchase the item in full via PayPal or with a valid
                      credit or debit card. If your application is declined,
                      it’s usually for one of the following reasons:
                    </p>
                    <ul>
                      <li>you do not meet the eligibility criteria;</li>
                      <li>adverse credit reference agency information;</li>
                      <li>your credit score;</li>
                      <li>
                        you are considered to be overcommitted financially; or
                      </li>
                      <li>
                        your existing account performance with other lenders.
                        <p>&nbsp;</p>
                      </li>
                    </ul>
                    <p>
                      If you wish to appeal the decision made by V12, it’s
                      advised you obtain an up to date copy of your credit
                      report before appealing directly to V12. Due to data
                      protection, all customer appeals must be email to{' '}
                      <a href="mailto:support@bedkingdom.co.uk">
                        support@bedkingdom.co.uk
                      </a>{' '}
                      or for more advice, call V12 on 01924 950 108.
                    </p>
                    <h2>
                      A little bit about V12 Retail <br />
                      Finance, our 3rd party provider
                    </h2>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      We've teamed up with V12 Retail Finance Limited ("V12") to
                      offer you a flexible and affordable option to pay on
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      finance. V12 is the UK's only specialist provider of
                      Retail Point of Sale Credit, providing finance options for
                      more than 20 years through its industry leading online
                      paperless processing system. If your application is
                      successful, you will enter into a Credit Agreement with
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Secure Trust Bank Plc (V12's parent company) which will be
                      administered by V12. V12 is authorised and regulated by
                      the Financial Conduct Authority. Secure Trust Bank Plc is
                      authorised by the Prudential Regulation Authority and
                      regulated by the Financial Conduct Authority and the
                      Prudential Regulation Authority under registration number
                      204550.
                    </p>
                    <div className="V12Logo">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabActive === 'klarna' && (
          <>
            <div id="tab-klarna" className="item content">
              <div className="klarna-calculator">
                <div id="klarna-popup-content">
                  <div className="body ">
                    <div className="header">Loan Calculator</div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="item p-3">
                        <div className="section">
                          Use this calculator to see which finance option suits
                          your purchase.
                        </div>
                        <div className="section">
                          <label>Cash Price (£):</label>{' '}
                          <input
                            type="text"
                            id="cashPriceKlarna"
                            value={klanarCash}
                            onChange={(event) => {
                              setKlanarCash(parseInt(event.target.value));
                            }}
                          />
                          <br />
                          <input
                            type="range"
                            id="cashPriceKlarna"
                            min={250}
                            max={15000}
                            value={klanarCash}
                            onChange={(event) => {
                              setKlanarCash(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="item p-3">
                        <div className="section">
                          <span className="select-klarna-product">
                            Finance is subject to status. Terms and conditions
                            apply.
                          </span>{' '}
                          <div className="klarna-product-list">
                            <div className="b-finance-product-list">
                              {BED_KINGDOM_COMMON.FINANCEPRODUCTSKLARA.map(
                                (item) => (
                                  <React.Fragment
                                    key={JSON.stringify(item?.productId)}
                                  >
                                    <input
                                      type="radio"
                                      name="b-finance-product v12finance-product"
                                      id={`v12finance-product${item?.productId}`}
                                      defaultValue={item?.productId}
                                      onChange={() =>
                                        setFinanceProductKlaraId(
                                          item?.productId
                                        )
                                      }
                                      checked={
                                        financeProducKlaratId ===
                                        item?.productId
                                      }
                                    />
                                    <label
                                      htmlFor={`v12finance-product${item?.productId}`}
                                      className={`${
                                        financeProducKlaratId ===
                                          item?.productId && 'active'
                                      }`}
                                      title={item?.name}
                                      onClick={() => {
                                        setFinanceProductKlaraId(
                                          item?.productId
                                        );
                                      }}
                                    >
                                      {item?.months} / <span>{item?.apr}%</span>
                                    </label>
                                  </React.Fragment>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item p-3">
                        <div className="klarna-calculator-information-popup">
                          <div className="klarna-breakdown mdm:text-center">
                            {klanarPayments.loanAmount && (
                              <p>
                                This is a loan of{' '}
                                <span>&pound;{klanarPayments.loanAmount}</span>{' '}
                                with no depositKlarna
                              </p>
                            )}
                            {klanarPayments.initialPayments !==
                              klanarPayments.finalPayment &&
                            klanarPayments.finalPayment > 0 ? (
                              <p>
                                Repayable by{' '}
                                <span>{klanarPayments.months - 1}</span> monthly
                                repayments of{' '}
                                <span>
                                  &pound;{klanarPayments.initialPayments}
                                </span>{' '}
                                and a final payment of{' '}
                                <span>
                                  &pound;{klanarPayments.finalPayment}
                                </span>
                              </p>
                            ) : (
                              <p>
                                Repayable by{' '}
                                <span>{klanarPayments.months}</span> monthly
                                repayments of{' '}
                                <span>
                                  &pound;{klanarPayments.initialPayments}
                                </span>
                              </p>
                            )}

                            {klanarPayments.documentFee > 0 ? (
                              <p>
                                An arrangement fee of{' '}
                                <span>
                                  {' '}
                                  &pound;{klanarPayments.documentFee}
                                </span>{' '}
                                is payable on approval
                              </p>
                            ) : (
                              <p>
                                An arrangement fee of{' '}
                                <span>&pound;{klanarPayments.documentFee}</span>{' '}
                                is payable with first instalment
                              </p>
                            )}
                            <p>
                              Total amount repayable
                              <span className="klarna-total-repayable">
                                &pound;{klanarPayments.amountPayable}
                              </span>
                            </p>
                            <p>
                              APR{' '}
                              <span className="klarna-interest">
                                {' '}
                                {klanarPayments.apr}%
                              </span>{' '}
                              representative
                            </p>
                          </div>
                        </div>
                        <div
                          className="pt-3 mdm:text-center"
                          id="lowestMonthlyPaymentsKlarna"
                        >
                          <button
                            className="btn bg-main-26ade4 text-white rounded-3 pt-2 pb-2  h-33px ml-auto mr-auto text-14px font-normal pl-4 pr-4"
                            title="Click"
                            onClick={() =>
                              getLowestMonthlyPaymentsKlarnaKlarna()
                            }
                          >
                            <span>Lowest Monthly Repayment</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="klarna-tabs" role="tablist">
                  <div
                    className={clsx(
                      'item title',
                      tabActiveKlarna === 'later' && 'active'
                    )}
                    onClick={() => setTabActiveKlarna('later')}
                  >
                    <span className="switch" data-toggle="trigger">
                      <span className="desktop">Pay later</span>
                      <span className="mobile">Pay later</span>
                    </span>
                  </div>
                  <div
                    className={clsx(
                      'item title',
                      tabActiveKlarna === 'instalments' && 'active'
                    )}
                    onClick={() => setTabActiveKlarna('instalments')}
                  >
                    <span className="switch" data-toggle="trigger">
                      <span className="desktop">
                        Pay later in 3 instalments
                      </span>
                      <span className="mobile">3 instalments</span>
                    </span>
                  </div>
                  <div
                    className={clsx(
                      'item title',
                      tabActiveKlarna === 'interest' && 'active'
                    )}
                    onClick={() => setTabActiveKlarna('interest')}
                  >
                    <span className="switch" data-toggle="trigger">
                      <span className="desktop">
                        Slice it - Interest free 0% Available
                      </span>
                      <span className="mobile">Slice it</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {tabActiveKlarna === 'later' && (
                <div id="tab-pay-later" className="item content">
                  <div className="klarna-page-container">
                    <h3>Pay later with Klarna</h3>
                    <h6>Buy it. Love it. Pay for it.</h6>
                    <ul>
                      <li>
                        30 days to pay with no interest or fees for the service
                        - ever
                      </li>
                      <li>Simple, safe and secure</li>
                      <li>
                        <span>Get the goods first. Pay later.</span>
                      </li>
                    </ul>
                    <h6>Shop with just a few clicks!</h6>
                    <div className="block">
                      <div className="block-content">
                        <div className="table-wrapper orders-recent">
                          <table
                            id="pay-later"
                            className="data table table-order-items recent"
                          >
                            <thead>
                              <tr>
                                <th className="col" scope="col">
                                  1
                                </th>
                                <th className="col" scope="col">
                                  2
                                </th>
                                <th className="col" scope="col">
                                  3
                                </th>
                                <th className="col" scope="col">
                                  4
                                </th>
                                <th className="col" scope="col">
                                  5
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="col 1" data-th={1}>
                                  Select ‘Pay later’ at checkout.
                                </td>
                                <td className="col 2" data-th={2}>
                                  Enter a few personal details - name, email,
                                  postcode and DOB. No card information
                                  required!
                                </td>
                                <td className="col 3" data-th={3}>
                                  Complete the purchase and your items will be
                                  shipped.
                                </td>
                                <td className="col 4" data-th={4}>
                                  Receive payment instructions from Klarna via
                                  email
                                </td>
                                <td className="col 5" data-th={5}>
                                  Enjoy your goods and pay when you’re ready!
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <h6>Pay later FAQ’s</h6>
                    <div className="pay-later-faq">
                      <div>
                        <span className="title">Shopping with Klarna</span>
                        <p>
                          You can review your latest buys and settle your
                          monthly statement at any time by logging in at{' '}
                          <a href="https://www.klarna.com/uk/">klarna.com/uk</a>{' '}
                          or by downloading the Klarna app.
                        </p>
                        <p>
                          If you need further assistance you can contact our
                          customer care team for free, or use our online chat
                          service.
                        </p>
                      </div>
                      <div>
                        <span className="title">
                          Peace of mind with Klarna’s Buyer Protection
                        </span>
                        <p>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          You only pay for goods you receive. If you don't
                          receive what you ordered, call our customer services
                          and we’ll help resolve the issue.
                        </p>
                        <p>More about Klarna’s Buyer Protection</p>
                      </div>
                    </div>
                    <h6>Contact Klarna</h6>
                    <p>
                      If you need further assistance you can contact Klarna’s
                      customer care team for free, or use our online chat
                      service.
                    </p>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Please find links below to Klarna's website where you can
                      find more information on Pay later.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/smoooth">Click here</a>{' '}
                      for information regarding Pay later.
                      <br />
                      <br />
                      <a href="https://www.klarna.com/uk/customer-service">
                        Click here
                      </a>{' '}
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      for frequently asked questions or Klarna's Customer
                      Service
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/customer-service">
                        www.klarna.com/uk/customer-service <br />
                        <br />
                      </a>
                      Local number: 0203 0050 833
                    </p>
                    <p>Freephone number: 0808 1893 333</p>
                    <h6>About Klarna</h6>
                    <p>
                      It’s all about smoooth (yes, with 3 ooo’s). Klarna is
                      Europe’s leading alternative payments provider and a
                      newly-licensed bank, which wants to revolutionise the
                      payment experience for shoppers and merchants alike.
                      Founded in Stockholm, Sweden, in 2005, the fintech unicorn
                      gives online consumers the option to pay now, pay later or
                      over time – offering a trusted, frictionless and smoooth
                      checkout experience.
                    </p>
                    <p>
                      With Klarna, customers only need to provide top-of-mind
                      information to complete a purchase. At the core of
                      Klarna’s services is Pay later, which lets you check out
                      items in your own home before you pay.
                    </p>
                    <p>
                      Klarna now works with 100,000 merchants to offer payment
                      solutions to shoppers across Europe and North America.
                      Klarna has 2,000 employees and is active in 14 countries.
                    </p>
                    <p>
                      <a href="https://www.klarna.com">www.klarna.com</a>
                    </p>
                    <p>&nbsp;</p>
                  </div>
                </div>
              )}

              {tabActiveKlarna === 'instalments' && (
                <div
                  id="tab-3-instalments"
                  className="item content"
                  data-role="content"
                  role="tabpanel"
                  aria-hidden="true"
                >
                  <div className="klarna-page-container">
                    <h3>Pay later in 3 instalments with Klarna</h3>
                    <h6>Forget FOMO. Pay later in 3 equal instalments.</h6>
                    <ul>
                      <li>Get what you love now. Pay over time.</li>
                      <li>
                        One part payment at purchase and 2 further payments at
                        30 and 60 days
                      </li>
                      <li>
                        Automatically collected monthly from your chosen debit
                        or credit card
                      </li>
                      <li>No interest or fees - ever</li>
                      <li>No credit application required</li>
                      <li>Simple and safe</li>
                    </ul>
                    <h6>Shop with just a few clicks!</h6>
                    <div className="block">
                      <div className="block-content">
                        <div className="table-wrapper orders-recent">
                          <table
                            id="3-instalments"
                            className="data table table-order-items recent"
                          >
                            <thead>
                              <tr>
                                <th className="col" scope="col">
                                  1
                                </th>
                                <th className="col" scope="col">
                                  2
                                </th>
                                <th className="col" scope="col">
                                  3
                                </th>
                                <th className="col" scope="col">
                                  4
                                </th>
                                <th className="col" scope="col">
                                  5
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="col 1" data-th={1}>
                                  Select ‘Pay later in 3’ at checkout
                                </td>
                                <td className="col 2" data-th={2}>
                                  Enter your address, email, mobile and card
                                  details
                                </td>
                                <td className="col 3" data-th={3}>
                                  The first part payment will be taken from your
                                  card when the goods ship.
                                </td>
                                <td className="col 4" data-th={4}>
                                  Receive your goods and enjoy!
                                </td>
                                <td className="col 5" data-th={5}>
                                  The two remaining payments will be taken at 30
                                  and 60 days. You will receive notifications
                                  when payment is due and when it is collected.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <h6>Product FAQs</h6>
                    <div className="pay-later-faq">
                      <div>
                        <span className="title">Shopping with Klarna</span>
                        <p>
                          You can view all of your Klarna purchases and payment
                          schedule simply by logging onto{' '}
                          <a href="https://www.klarna.com/uk/">klarna.com/uk</a>
                          . If you need further assistance you can contact our
                          customer care team for free, or use our online chat
                          service.
                        </p>
                      </div>
                      <div>
                        <span className="title">
                          Peace of mind with Klarna’s buyer protection
                        </span>
                        <p>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          You only pay for goods you receive. If you don't
                          receive what you ordered, call our customer services
                          and we’ll help resolve the issue.
                        </p>
                        <p>More about Klarna’s Buyer Protection</p>
                      </div>
                    </div>
                    <h6>Contact Klarna</h6>
                    <p>
                      If you need further assistance you can contact Klarna’s
                      customer care team for free, or use our online chat
                      service.
                    </p>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Please find links below to Klarna's website where you can
                      find more information on Klarna.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/smoooth">Click here</a>{' '}
                      for information regarding Klarna’s products.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/customer-service">
                        Click here
                      </a>{' '}
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      for frequently asked questions or Klarna's Customer
                      Service
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/customer-service">
                        www.klarna.com/uk/customer-service{' '}
                      </a>
                    </p>
                    <p>Local number: 0203 0050 833</p>
                    <p>Freephone number: 0808 1893 333</p>
                    <h6>About Klarna</h6>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Klarna is one of Europe's fastest growing companies and a
                      leading alternative payment provider. Klarna’s vision is
                      to make all payments ‘smoooth’ adding value for both the
                      consumer and merchant with our unique payment options and
                      customer experience.
                    </p>
                    <p>
                      Klarna was founded in 2005. In 2014 we joined forces with
                      SOFORT and formed Klarna Group and in 2017 acquired
                      BillPay. Today we have 2000 employees in 14 markets and
                      lead the way for European alternative payments serving 60
                      million consumers and 100,000 merchants.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/">www.klarna.com</a>
                    </p>
                  </div>
                </div>
              )}
              {tabActiveKlarna === 'interest' && (
                <div
                  id="tab-slice-it"
                  className="item content"
                  data-role="content"
                  role="tabpanel"
                  aria-hidden="true"
                >
                  <div className="klarna-page-container">
                    <h1>Klarna - Up to 9 months interest free credit</h1>
                    <h3>Slice it with a Klarna Account&nbsp;</h3>
                    <h6>Pay over time.</h6>
                    <ul>
                      <li>
                        Spread the cost of your purchase into equal monthly
                        payments without paying interest.
                      </li>
                      <li>
                        No complex forms during the Klarna Account application -
                        only 4 steps!
                      </li>
                      <li>Credit decision made in real-time.</li>
                      <li>
                        Once approved, you will start a Klarna Account and make
                        payments monthly.
                      </li>
                      <li>
                        You can also use this Account to finance future
                        purchases up to your credit limit.
                      </li>
                      <li>
                        No passwords to remember. You will be emailed monthly
                        statements.
                      </li>
                      <li>
                        You can choose at any time to start paying the minimum
                        monthly payment instead with interest.
                      </li>
                      <li>
                        You’re in control. Better management of your finances to
                        spend how and when you want.
                      </li>
                    </ul>
                    <p>
                      Don’t forget to pay. If you miss monthly payments,
                      promotional interest rates are cancelled and you will be
                      required to pay interest on repayments. Representative
                      18.9% APR (variable)
                    </p>
                    <h6>
                      Representative example of interest incurred if you miss a
                      repayment
                    </h6>
                    <div className="slice-example">
                      <div>
                        <p>Representative (Variable)</p>
                        <p>18.9% APR</p>
                      </div>
                      <div>
                        <p>Purchase Interest Rate</p>
                        <p>18.9% p.a.</p>
                      </div>
                      <div>
                        <p>Assumed Credit Limit</p>
                        <p>£ 1,200</p>
                      </div>
                    </div>
                    <p>
                      Credit is offered subject to financial circumstances. You
                      must be at least 18.
                    </p>
                    <h6>The Klarna Account. How it works.</h6>
                    <div className="block">
                      <div className="block-content">
                        <div className="table-wrapper orders-recent">
                          <table
                            id="how-it-works"
                            className="data table table-order-items recent"
                          >
                            <thead>
                              <tr>
                                <th className="col" scope="col">
                                  1
                                </th>
                                <th className="col" scope="col">
                                  2
                                </th>
                                <th className="col" scope="col">
                                  3
                                </th>
                                <th className="col" scope="col">
                                  4
                                </th>
                                <th className="col" scope="col">
                                  5
                                </th>
                                <th className="col" scope="col">
                                  6
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="col" data-th={1}>
                                  Add items to your basket and go to the
                                  checkout.
                                </td>
                                <td className="col" data-th={2}>
                                  Select ‘Slice it with Klarna’ and choose your
                                  promotional plan to start the online
                                  application process.
                                </td>
                                <td className="col" data-th={3}>
                                  Provide information about your financial
                                  circumstances and carefully read the
                                  pre-contract and information documents.
                                </td>
                                <td className="col" data-th={4}>
                                  Read the Klarna Account Agreement and click
                                  “sign” to confirm that you want to apply. The
                                  credit decision will be made instantly.
                                </td>
                                <td className="col" data-th={5}>
                                  If you are approved, Klarna sends you a
                                  confirmation by email and sends the Klarna
                                  Account agreement by post. Confirmation and
                                  monthly statements with payment instructions
                                  are sent by email.
                                </td>
                                <td className="col" data-th={6}>
                                  It’s easy to use again - once you’ve been
                                  approved you can order in the future with just
                                  one click.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <h6>Manage your Klarna Account</h6>
                    <p>
                      You can review your latest buys and settle your monthly
                      statement at any time by accessing your Klarna account at
                      www.klarna.com. If you need further assistance you can
                      contact our customer care team for free, or use our online
                      chat service.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/customer-service">
                        www.klarna.com/uk/customer-service{' '}
                      </a>
                    </p>
                    <p>Local number: 0203 0050 833</p>
                    <p>Freephone number: 0808 1893 333</p>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Please find links below to Klarna's website where you can
                      find more information on Slice it.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/smoooth">Click here</a>{' '}
                      for information regarding Slice it.
                    </p>
                    <p>
                      <a href="https://www.klarna.com/uk/customer-service">
                        Click here
                      </a>{' '}
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      for frequently asked questions or Klarna's Customer
                      Service
                    </p>
                    <h6>About Klarna</h6>
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Klarna is one of Europe's fastest growing companies and a
                      leading alternative payment provider. Klarna’s vision is
                      to make all payments ‘smoooth’ adding value for both the
                      consumer and merchant with our unique payment options and
                      customer experiences.
                    </p>
                    <p>
                      Klarna was founded in 2005. In 2014 we joined forces with
                      SOFORT and formed Klarna Group and in 2017 acquired
                      BillPay. Today we have 2000 employees in 14 markets
                      serving 60 million consumers and 100,000 merchants.
                    </p>
                    <p>
                      <a href="https://www.klarna.com">www.klarna.com</a>
                    </p>
                    <div className="block">&nbsp;</div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default Finance;
