-- CreateTable
CREATE TABLE "stock_info_candles" (
    "id" SERIAL NOT NULL,
    "ticker" VARCHAR(20) NOT NULL,
    "source" VARCHAR(20) NOT NULL,
    "assetType" VARCHAR(20) NOT NULL,
    "resolution" SMALLINT NOT NULL,
    "time" TIMESTAMPTZ(6) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER NOT NULL,

    CONSTRAINT "stock_info_candles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_stock_info_candles_ticker_resolution_time" ON "stock_info_candles"("ticker", "resolution", "time" DESC);

-- CreateIndex
CREATE INDEX "idx_stock_info_candles_ticker_time" ON "stock_info_candles"("ticker", "time" DESC);

-- CreateIndex
CREATE INDEX "idx_stock_info_candles_time" ON "stock_info_candles"("time" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "uk_candle_ticker_resolution_time" ON "stock_info_candles"("ticker", "resolution", "time");
