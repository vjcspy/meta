-- CreateTable
CREATE TABLE "stock_trading_analysis_history" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    "deal_value_5" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "stock_trading_analysis_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_trading_analysis_history_symbol_date_key" ON "stock_trading_analysis_history"("symbol", "date");
