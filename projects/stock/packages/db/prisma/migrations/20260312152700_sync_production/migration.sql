-- CreateTable
CREATE TABLE "stock_common_configuration" (
    "id" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_common_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_trading_feature_candles" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "time" TIMESTAMPTZ(6) NOT NULL,
    "interval" INTEGER NOT NULL,
    "open" INTEGER NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "close" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "features" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_common_configuration_key_key" ON "stock_common_configuration"("key");

-- CreateIndex
CREATE INDEX "idx_stock_common_configuration_key" ON "stock_common_configuration"("key");

-- CreateIndex
CREATE INDEX "idx_stock_trading_feature_candles_symbol_time" ON "stock_trading_feature_candles"("symbol", "time" DESC);

-- CreateIndex
CREATE INDEX "idx_stock_trading_feature_candles_time" ON "stock_trading_feature_candles"("time" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "uk_symbol_time" ON "stock_trading_feature_candles"("symbol", "time");

