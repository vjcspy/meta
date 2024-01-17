-- CreateTable
CREATE TABLE "candlesticks" (
    "open_time" BIGINT NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "close_time" BIGINT NOT NULL,
    "quote_asset_volume" DOUBLE PRECISION NOT NULL,
    "number_of_trades" INTEGER NOT NULL,
    "taker_buy_volume" DOUBLE PRECISION NOT NULL,
    "taker_buy_quote_asset_volume" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "candlesticks_pkey" PRIMARY KEY ("open_time")
);

-- CreateTable
CREATE TABLE "um_aggregate_trades" (
    "aggregate_trade_id" BIGINT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "first_trade_id" BIGINT NOT NULL,
    "last_trade_id" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "was_buyer_maker" BOOLEAN NOT NULL,

    CONSTRAINT "um_aggregate_trades_pkey" PRIMARY KEY ("aggregate_trade_id")
);

-- CreateTable
CREATE TABLE "history_data_fetcher_state" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "start_time" BIGINT NOT NULL,
    "end_time" BIGINT,
    "number_of_try" SMALLINT NOT NULL,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_data_fetcher_state_pkey" PRIMARY KEY ("id")
);
