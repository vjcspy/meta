-- CreateTable
CREATE TABLE "public"."stock_trading_analysis" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "trade_value_7" BIGINT DEFAULT 0,
    "trade_value_14" BIGINT DEFAULT 0,
    "trade_value_30" BIGINT DEFAULT 0,
    "cap" BIGINT DEFAULT 0,
    "l16_hullma_trend" SMALLINT NOT NULL DEFAULT 0,
    "l16_hullma_day_in_trend" SMALLINT NOT NULL DEFAULT 0,
    "l16_hullma_highest_diff_percent" SMALLINT NOT NULL DEFAULT 0,
    "cur_gap_percent" SMALLINT NOT NULL DEFAULT 0,
    "foreign_buy_30" SMALLINT NOT NULL DEFAULT 0,
    "foreign_sell_30" SMALLINT NOT NULL DEFAULT 0,
    "foreign_diff_30" SMALLINT NOT NULL DEFAULT 0,
    "foreign_buy_15" SMALLINT NOT NULL DEFAULT 0,
    "foreign_sell_15" SMALLINT NOT NULL DEFAULT 0,
    "foreign_diff_15" SMALLINT NOT NULL DEFAULT 0,
    "foreign_buy_7" SMALLINT NOT NULL DEFAULT 0,
    "foreign_sell_7" SMALLINT NOT NULL DEFAULT 0,
    "foreign_diff_7" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_trading_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_trading_analysis_symbol_key" ON "public"."stock_trading_analysis"("symbol");
