-- CreateTable
CREATE TABLE "klines" (
    "id" BIGSERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "interval" VARCHAR(10) NOT NULL,
    "open_time" BIGINT NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "close_time" BIGINT NOT NULL,

    CONSTRAINT "klines_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "strategy_history_test_result" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "pass_count" SMALLINT NOT NULL DEFAULT 0,
    "fail_count" SMALLINT NOT NULL DEFAULT 0,
    "unknown_count" SMALLINT NOT NULL DEFAULT 0,
    "risk_count" SMALLINT NOT NULL DEFAULT 0,
    "sl" DOUBLE PRECISION NOT NULL,
    "tp" DOUBLE PRECISION NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "profit_base" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "data" TEXT,
    "result" TEXT,
    "note" TEXT,
    "config_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strategy_history_test_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flag" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL DEFAULT '_',
    "key" VARCHAR NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "klines_symbol_open_time_interval_key" ON "klines"("symbol", "open_time", "interval");

-- CreateIndex
CREATE INDEX "strategy_history_test_result_config_hash_idx" ON "strategy_history_test_result" USING HASH ("config_hash");

-- CreateIndex
CREATE UNIQUE INDEX "flag_type_key_key" ON "flag"("type", "key");
