-- CreateTable
CREATE TABLE "cor_entity" (
    "id" SERIAL NOT NULL,
    "refId" INTEGER,
    "catId" INTEGER,
    "code" VARCHAR(255) NOT NULL,
    "exchange" VARCHAR(255) NOT NULL,
    "industryName1" VARCHAR(255),
    "industryName2" VARCHAR(255),
    "industryName3" VARCHAR(255),
    "totalShares" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "firstTradeDate" DATE,

    CONSTRAINT "cor_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fa_beta_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "beta_12" DECIMAL(4,3),
    "beta_24" DECIMAL(4,3),
    "beta_36" DECIMAL(4,3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fa_beta_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_balance_sheet_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "quarter" SMALLINT,
    "year" SMALLINT NOT NULL,
    "termType" SMALLINT NOT NULL,
    "periodBegin" VARCHAR(6),
    "periodEnd" VARCHAR(6),
    "united" VARCHAR(3),
    "auditedStatus" VARCHAR(3) NOT NULL,
    "assets" INTEGER,
    "shortTermAssets" INTEGER,
    "cashAndCashEquivalents" INTEGER,
    "cash" INTEGER,
    "cashEquivalents" INTEGER,
    "shortTermFinancialInvestments" INTEGER,
    "availableForSaleSecurities" INTEGER,
    "availableForSaleSecurity" INTEGER,
    "heldToMaturityInvestments" INTEGER,
    "shortTermReceivables" INTEGER,
    "shortTermTradeAccountsReceivable" INTEGER,
    "shortTermPrepaymentsToSuppliers" INTEGER,
    "shortTermInterCompanyReceivables" INTEGER,
    "progressBillingDefined" INTEGER,
    "shortTermLoanReceivables" INTEGER,
    "otherShortTermReceivables" INTEGER,
    "provisionForShortTermDoubtfulDebts" INTEGER,
    "assetsAwaitingResolution" INTEGER,
    "inventoriesGroup" INTEGER,
    "inventories" INTEGER,
    "provisionForDeclineInValueOfInventories" INTEGER,
    "otherShortTermAssetsGroup" INTEGER,
    "shortTermPrepayments" INTEGER,
    "valueAddedTaxToBeReclaimed" INTEGER,
    "taxesAndOtherReceivables" INTEGER,
    "governmentBonds" INTEGER,
    "otherShortTermAssets" INTEGER,
    "longTermAssets" INTEGER,
    "longTermReceivables" INTEGER,
    "longTermTradeReceivables" INTEGER,
    "longTermPrepaymentsToSuppliers" INTEGER,
    "capitalAtInterCompany" INTEGER,
    "longTermInterCompanyReceivables" INTEGER,
    "longTermLoanReceivables" INTEGER,
    "otherLongTermReceivables" INTEGER,
    "provisionForLongTermDoubtfulDebts" INTEGER,
    "fixedAssets" INTEGER,
    "tangibleFixedAssets" INTEGER,
    "costMaterial" INTEGER,
    "accumulatedDepreciation" INTEGER,
    "financialLeasedFixedAssets" INTEGER,
    "costFinancialLeaseFixedAssets" INTEGER,
    "accumulatedDepreciationFinancialLease" INTEGER,
    "intangibleFixedAssets" INTEGER,
    "costIntangible" INTEGER,
    "accumulatedDepreciationIntangible" INTEGER,
    "investmentProperties" INTEGER,
    "costInvestmentProperties" INTEGER,
    "accumulatedDepreciationInvestmentProperties" INTEGER,
    "longTermAssetsInProgress" INTEGER,
    "longTermProductionInProgress" INTEGER,
    "constructionInProgress" INTEGER,
    "longTermFinancialInvestments" INTEGER,
    "investmentsInSubsidiaries" INTEGER,
    "investmentsInAssociates" INTEGER,
    "investmentsInOtherEntities" INTEGER,
    "provisionForDiminution" INTEGER,
    "heldToMaturityFinancialInvestments" INTEGER,
    "otherLongTermInvestments" INTEGER,
    "otherLongTermAssets" INTEGER,
    "longTermPrepayments" INTEGER,
    "deferredIncomeTaxAssets" INTEGER,
    "longTermEquipmentSuppliesSpareParts" INTEGER,
    "otherLongTermAssetsRealEstate" INTEGER,
    "goodwill" INTEGER,
    "totalAssets" INTEGER,
    "ownerEquityCapital" INTEGER,
    "liabilities" INTEGER,
    "shortTermLiabilities" INTEGER,
    "shortTermTradeAccountsPayable" INTEGER,
    "shortTermAdvancesFromCustomers" INTEGER,
    "taxesAndOtherPayables" INTEGER,
    "payableToEmployees" INTEGER,
    "shortTermAcrruedExpenses" INTEGER,
    "shortTermInterCompanyPayables" INTEGER,
    "constructionContractProgressPayments" INTEGER,
    "shortTermUnearnedRevenue" INTEGER,
    "otherShortTermPayables" INTEGER,
    "shortTermBorrowingsAndFinancialLeases" INTEGER,
    "provisionForShortTermLiabilities" INTEGER,
    "bonusAndWelfareFund" INTEGER,
    "priceStabilizationFund" INTEGER,
    "governmentBondsCapital" INTEGER,
    "longTermLiabilities" INTEGER,
    "longTermTradePayables" INTEGER,
    "longTermAdvancesFromCustomers" INTEGER,
    "longTermAcrruedExpenses" INTEGER,
    "interCompanyPayablesOnBusinessCapital" INTEGER,
    "longTermInterCompanyPayables" INTEGER,
    "longTermUnearnedRevenue" INTEGER,
    "otherLongTermLiabilities" INTEGER,
    "longTermBorrowingsAndFinancialLeases" INTEGER,
    "convertibleBonds" INTEGER,
    "preferredStockDebt" INTEGER,
    "deferredIncomeTaxLiabilities" INTEGER,
    "provisionForLongTermLiabilities" INTEGER,
    "fundForTechnologyDevelopment" INTEGER,
    "provisionForSeveranceAllowances" INTEGER,
    "ownerEquityGroup" INTEGER,
    "ownerEquity" INTEGER,
    "ownerCapital" INTEGER,
    "commonStockWithVotingRight" INTEGER,
    "preferredStock" INTEGER,
    "sharePremium" INTEGER,
    "convertibleBondOption" INTEGER,
    "otherCapitalOfOwners" INTEGER,
    "treasuryShares" INTEGER,
    "assetsRevaluationDifferences" INTEGER,
    "foreignExchangeDifferences" INTEGER,
    "investmentAndDevelopmentFund" INTEGER,
    "fundToSupportCorporateRestructuring" INTEGER,
    "otherFundsFromOwnerEquity" INTEGER,
    "undistributedEarningsAfterTax" INTEGER,
    "accumulatedRetainedEarning" INTEGER,
    "undistributedEarningsInThisPeriod" INTEGER,
    "reservesForInvestmentInConstruction" INTEGER,
    "minorityInterest" INTEGER,
    "financialReserves" INTEGER,
    "otherResourcesAndFunds" INTEGER,
    "subsidizedNotForProfitFunds" INTEGER,
    "fundsInvestedInFixedAssets" INTEGER,
    "cMinorityInterest" INTEGER,
    "totalOwnerEquityAndLiabilities" INTEGER,

    CONSTRAINT "financial_balance_sheet_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_business_report_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "quarter" SMALLINT,
    "year" SMALLINT NOT NULL,
    "termType" SMALLINT NOT NULL,
    "periodBegin" VARCHAR(6),
    "periodEnd" VARCHAR(6),
    "united" VARCHAR(3),
    "auditedStatus" VARCHAR(3) NOT NULL,
    "revenue" INTEGER,
    "deductionFromRevenue" INTEGER,
    "netRevenue" INTEGER,
    "costOfGoodsSold" INTEGER,
    "grossProfit" INTEGER,
    "financialIncome" INTEGER,
    "financialExpenses" INTEGER,
    "interestExpenses" INTEGER,
    "shareOfAssociatesAndJointVenturesResult" INTEGER,
    "sellingExpenses" INTEGER,
    "generalAndAdministrativeExpenses" INTEGER,
    "operatingProfit" INTEGER,
    "otherIncome" INTEGER,
    "otherExpenses" INTEGER,
    "otherProfit" INTEGER,
    "shareOfAssociatesAndJointVentures" INTEGER,
    "profitBeforeTax" INTEGER,
    "currentCorporateIncomeTaxExpenses" INTEGER,
    "deferredIncomeTaxExpenses" INTEGER,
    "netProfitAfterTax" INTEGER,
    "minorityInterest" INTEGER,
    "profitAfterTaxForShareholdersOfParentCompany" INTEGER,
    "earningsPerShare" INTEGER,
    "dilutedEarningsPerShare" INTEGER,

    CONSTRAINT "financial_business_report_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_cash_flow_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "quarter" SMALLINT,
    "year" SMALLINT NOT NULL,
    "termType" SMALLINT NOT NULL,
    "periodBegin" VARCHAR(6),
    "periodEnd" VARCHAR(6),
    "united" VARCHAR(3),
    "auditedStatus" VARCHAR(3) NOT NULL,
    "cashFlowsFromOperatingActivities" INTEGER,
    "profitBeforeTax" INTEGER,
    "adjustmentsFor" INTEGER,
    "depreciationOfFixedAssetsAndPropertiesInvestment" INTEGER,
    "reversalOfProvisionsOverProvisions" INTEGER,
    "foreignxEchangeGainLoss" INTEGER,
    "lossProfitFromInvestmentActivities" INTEGER,
    "interestExpense" INTEGER,
    "lossProfitsFromDisposalOfFixedAsset" INTEGER,
    "interestIncomeAndDividends" INTEGER,
    "allocationOfGoodwill" INTEGER,
    "otherAdjustmentsFor" INTEGER,
    "operatingProfitBeforeChangesInWorkingCapital" INTEGER,
    "increaseDecreaseInReceivables" INTEGER,
    "increaseDecreaseInInventories" INTEGER,
    "increaseDecreaseInPayables" INTEGER,
    "increaseDecreaseInPrepaidExpenses" INTEGER,
    "changesInAvailableForSaleSecurities" INTEGER,
    "interestPaid" INTEGER,
    "corporateIncomeTaxPaid" INTEGER,
    "otherReceiptsFromOperatingActivities" INTEGER,
    "otherPaymentsForOperatingActivities" INTEGER,
    "netCashFlowsFromOperatingActivities" INTEGER,
    "cashFlowsFromInvestingActivities" INTEGER,
    "paymentForFixedAssets" INTEGER,
    "receiptsFromDisposalOfFixedAssets" INTEGER,
    "loansPurchasesOfOtherEntities" INTEGER,
    "receiptsFromLoanRepayments" INTEGER,
    "paymentsForInvestmentInOtherEntities" INTEGER,
    "collectionsOnInvestmentInOtherEntities" INTEGER,
    "dividendsInterestAndProfit" INTEGER,
    "increaseDecreaseInTermDeposit" INTEGER,
    "purchasesOfMinoritySharesOfSubsidiaries" INTEGER,
    "otherReceiptsFromInvestingActivities" INTEGER,
    "otherPaymentsForInvestingActivities" INTEGER,
    "netCashFlowsFromInvestingActivities" INTEGER,
    "cashFlowsFromFinancingActivities" INTEGER,
    "receiptsFromEquityIssue" INTEGER,
    "paymentForShareRepurchases" INTEGER,
    "proceedsFromBorrowings" INTEGER,
    "principalRepayments" INTEGER,
    "repaymentOfFinancialLeases" INTEGER,
    "dividendsPaidProfitsDistributedToOwners" INTEGER,
    "otherReceiptsFromFinancingActivities" INTEGER,
    "otherPaymentsForFinancingActivities" INTEGER,
    "netCashFlowsFromFinancingActivities" INTEGER,
    "netCashFlowsDuringThePeriod" INTEGER,
    "cashAndCashEquivalents" INTEGER,
    "exchangeDifferenceDue" INTEGER,
    "cashAndCashEquivalentsAtEnd" INTEGER,

    CONSTRAINT "financial_cash_flow_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_indicators_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "quarter" SMALLINT,
    "year" SMALLINT NOT NULL,
    "termType" SMALLINT NOT NULL,
    "periodBegin" VARCHAR(6),
    "periodEnd" VARCHAR(6),
    "united" VARCHAR(3),
    "auditedStatus" VARCHAR(3) NOT NULL,
    "costOfGoodSoldOverNetRevenue" DECIMAL(10,3),
    "sellingExpensesOverNetRevenue" DECIMAL(10,3),
    "generalAndAdministrativeExpensesOverNetRevenue" DECIMAL(10,3),
    "interestExpensesOverNetRevenue" DECIMAL(10,3),
    "longTermAssetsOverTotalAssets" DECIMAL(10,3),
    "fixedAssetsOverTotalAssets" DECIMAL(10,3),
    "tangibleFixedAssetsOverFixedAssets" DECIMAL(10,3),
    "financeLeaseOverFixedAssets" DECIMAL(10,3),
    "intangibleFixedAssetsOverFixedAssets" DECIMAL(10,3),
    "constructionInProgressOverFixedAssets" DECIMAL(10,3),
    "shortTermAssetsOverTotalAssets" DECIMAL(10,3),
    "cashOverShortTermAssets" DECIMAL(10,3),
    "shortTermInvestmentsOverShortTermAssets" DECIMAL(10,3),
    "shortTermReceivablesOverShortTermAssets" DECIMAL(10,3),
    "inventoryOverShortTermAssets" DECIMAL(10,3),
    "otherShortTermAssetsOverShortTermAssets" DECIMAL(10,3),
    "accrualRatioCF" DECIMAL(10,3),
    "cashToIncome" DECIMAL(10,3),
    "netCashFlowsOverShortTermLiabilities" DECIMAL(10,3),
    "accrualRatioBalanceSheetMethod" DECIMAL(10,3),
    "accrualRatioCashFlowMethod" DECIMAL(10,3),
    "cashReturnToAssets" DECIMAL(10,3),
    "cashReturnOnEquity" DECIMAL(10,3),
    "operatingCashFlowOverRevenues" DECIMAL(10,3),
    "debtCoverage" DECIMAL(10,3),
    "cashFlowPerShareCPS" DECIMAL(10,3),
    "receivablesTurnover" DECIMAL(10,3),
    "daysOfSalesOutstanding" DECIMAL(10,3),
    "inventoryTurnover" DECIMAL(10,3),
    "daysOfInventoryOnHand" DECIMAL(10,3),
    "payablesTurnover" DECIMAL(10,3),
    "numberOfDaysOfPayables" DECIMAL(10,3),
    "fixedAssetTurnover" DECIMAL(10,3),
    "totalAssetTurnover" DECIMAL(10,3),
    "equityTurnover" DECIMAL(10,3),
    "grossProfitMargin" DECIMAL(10,3),
    "ebitMargin" DECIMAL(10,3),
    "ebitDAOverNetRevenue" DECIMAL(10,3),
    "netProfitMargin" DECIMAL(10,3),
    "roe" DECIMAL(10,3),
    "returnOnCapitalEmployedROCE" DECIMAL(10,3),
    "roa" DECIMAL(10,3),
    "cashRatio" DECIMAL(10,3),
    "quickRatio" DECIMAL(10,3),
    "quickRatioShortTermReceivablesReference" DECIMAL(10,3),
    "shortTermRatio" DECIMAL(10,3),
    "interestCoverage" DECIMAL(10,3),
    "netRevenue" DECIMAL(10,3),
    "grossProfit" DECIMAL(10,3),
    "profitBeforeTax" DECIMAL(10,3),
    "profitAfterTaxForShareholdersOfTheParentCompany" DECIMAL(10,3),
    "totalAssets" DECIMAL(10,3),
    "longTermLiabilities" DECIMAL(10,3),
    "liabilities" DECIMAL(10,3),
    "ownerEquity" DECIMAL(10,3),
    "charterCapital" DECIMAL(10,3),
    "shortTermLiabilitiesToTotalLiabilities" DECIMAL(10,3),
    "debtToAssets" DECIMAL(10,3),
    "liabilitiesToAssets" DECIMAL(10,3),
    "equityToAssets" DECIMAL(10,3),
    "shortTermLiabilitiesToEquity" DECIMAL(10,3),
    "debtToEquity" DECIMAL(10,3),
    "liabilitiesToEquity" DECIMAL(10,3),
    "trailingEPS" DECIMAL(10,3),
    "bookValuePerShareBVPS" INTEGER,
    "pe" DECIMAL(10,3),
    "pb" DECIMAL(10,3),
    "ps" DECIMAL(10,3),
    "dividendYield" DECIMAL(10,3),
    "beta" DECIMAL(10,3),
    "evOverEBIT" DECIMAL(10,3),
    "evOverEBITDA" DECIMAL(10,3),

    CONSTRAINT "financial_indicators_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_info_status_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "type" VARCHAR(4) NOT NULL,
    "termType" SMALLINT NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "quarter" VARCHAR(1),
    "error" TEXT,

    CONSTRAINT "financial_info_status_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sector_entity" (
    "id" SERIAL NOT NULL,
    "sectorName" VARCHAR(255) NOT NULL,
    "level" SMALLINT NOT NULL,

    CONSTRAINT "sector_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_price_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "adClose" INTEGER NOT NULL,
    "adHigh" INTEGER NOT NULL,
    "adLow" INTEGER NOT NULL,
    "adOpen" INTEGER NOT NULL,
    "adRatio" DECIMAL(8,3) NOT NULL,
    "buyAvg" INTEGER NOT NULL,
    "buyCount" INTEGER NOT NULL,
    "buyQuantity" BIGINT NOT NULL,
    "buyForeignQuantity" BIGINT NOT NULL,
    "buyForeignValue" BIGINT NOT NULL,
    "currentForeignRoom" INTEGER NOT NULL DEFAULT 0,
    "dealVolume" INTEGER DEFAULT 0,
    "exchange" DECIMAL(8,3),
    "marketCap" INTEGER DEFAULT 0,
    "pricePreviousClose" INTEGER NOT NULL DEFAULT 0,
    "putThroughValue" BIGINT DEFAULT 0,
    "putThroughVolume" INTEGER DEFAULT 0,
    "shares" INTEGER DEFAULT 0,
    "priceAverage" DECIMAL(10,3) NOT NULL,
    "priceBasic" INTEGER NOT NULL,
    "priceClose" INTEGER NOT NULL,
    "priceHigh" INTEGER NOT NULL,
    "priceLow" INTEGER NOT NULL,
    "priceOpen" INTEGER NOT NULL,
    "sellAvg" INTEGER NOT NULL,
    "sellCount" INTEGER NOT NULL,
    "sellQuantity" BIGINT NOT NULL,
    "sellForeignQuantity" BIGINT NOT NULL,
    "sellForeignValue" BIGINT NOT NULL,
    "totalTrade" BIGINT NOT NULL,
    "totalValue" BIGINT NOT NULL,
    "totalVolume" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,

    CONSTRAINT "stock_price_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_price_sync_status_entity" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "lastDate" DATE,
    "lastUpdateDate" DATE NOT NULL,
    "lastError" TEXT,
    "try" SMALLINT,

    CONSTRAINT "stock_price_sync_status_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_status" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "is_success" BOOLEAN NOT NULL,
    "number_of_try" INTEGER,
    "error" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "meta" JSONB,
    "page" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sync_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_matching" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "page" INTEGER NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "order_matching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cron_schedule" (
    "id" SERIAL NOT NULL,
    "job_code" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cron_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IDX_ce504ece33ceadc9f7307e8101" ON "cor_entity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_2836ee1b531807b0a69387ce79" ON "fa_beta_entity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_ccdff6f1b957fd5c2fcb39f314" ON "financial_balance_sheet_entity"("code", "periodBegin", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_3bf19664cecac4e569ce0d39c7" ON "financial_business_report_entity"("code", "periodBegin", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_d0fffc189007c4a0c391aa7160" ON "financial_cash_flow_entity"("code", "periodBegin", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_335a78f8c48670a5fb5ba760cb" ON "financial_indicators_entity"("code", "periodBegin", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_1e019385c2375b76bfcc35e8f8" ON "financial_info_status_entity"("code", "termType", "type");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_d8a2cc44789d1df0e4e8f7c89f" ON "stock_price_entity"("code", "date");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_3b535f86c3be7e53a20299d4fb" ON "stock_price_sync_status_entity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_8ba3a6e51a856cff3192279c16" ON "stock_price_sync_status_entity"("code", "lastDate");

-- CreateIndex
CREATE UNIQUE INDEX "sync_status_key_key" ON "sync_status"("key");

-- CreateIndex
CREATE INDEX "sync_status_key_idx" ON "sync_status"("key");

-- CreateIndex
CREATE INDEX "order_matching_code_idx" ON "order_matching"("code");

-- CreateIndex
CREATE INDEX "cron_schedule_job_code_idx" ON "cron_schedule"("job_code");
