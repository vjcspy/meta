-- CreateTable
CREATE TABLE "stock_trading_analysis" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "trade_value_7" BIGINT DEFAULT 0,
    "trade_value_14" BIGINT DEFAULT 0,
    "trade_value_30" BIGINT DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_trading_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_trading_analysis_symbol_key" ON "stock_trading_analysis"("symbol");
