-- CreateTable
CREATE TABLE "market_tick_action_history_analyze" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "avg_shark_buy_count" SMALLINT NOT NULL,
    "avg_shark_sell_count" SMALLINT NOT NULL,
    "avg_shark_buy_value" SMALLINT NOT NULL,
    "avg_shark_sell_value" SMALLINT NOT NULL,
    "avg_sheep_buy_count" INTEGER NOT NULL,
    "avg_sheep_sell_count" INTEGER NOT NULL,
    "avg_sheep_buy_value" INTEGER NOT NULL,
    "avg_sheep_sell_value" INTEGER NOT NULL,
    "avg_buy_count" SMALLINT NOT NULL,
    "avg_sell_count" SMALLINT NOT NULL,
    "avg_buy_value" INTEGER NOT NULL,
    "avg_sell_value" INTEGER NOT NULL,

    CONSTRAINT "market_tick_action_history_analyze_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_tick_action_info" (
    "ts" INTEGER NOT NULL,
    "shark_buy_count" SMALLINT NOT NULL,
    "shark_sell_count" SMALLINT NOT NULL,
    "sheep_buy_count" SMALLINT NOT NULL,
    "sheep_sell_count" SMALLINT NOT NULL,
    "shark_buy_value" INTEGER NOT NULL,
    "shark_sell_value" INTEGER NOT NULL,
    "sheep_buy_value" INTEGER NOT NULL,
    "sheep_sell_value" INTEGER NOT NULL,
    "buy_count" SMALLINT NOT NULL,
    "sell_count" SMALLINT NOT NULL,
    "buy_value" INTEGER NOT NULL,
    "sell_value" INTEGER NOT NULL,

    CONSTRAINT "market_tick_action_info_pkey" PRIMARY KEY ("ts")
);

-- CreateTable
CREATE TABLE "market_tick_symbol_action_info" (
    "id" SERIAL NOT NULL,
    "ts" INTEGER NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "shark_buy_count" SMALLINT NOT NULL,
    "shark_sell_count" SMALLINT NOT NULL,
    "sheep_buy_count" SMALLINT NOT NULL,
    "sheep_sell_count" SMALLINT NOT NULL,
    "shark_buy_value" INTEGER NOT NULL,
    "shark_sell_value" INTEGER NOT NULL,
    "sheep_buy_value" INTEGER NOT NULL,
    "sheep_sell_value" INTEGER NOT NULL,
    "buy_count" SMALLINT NOT NULL,
    "sell_count" SMALLINT NOT NULL,
    "buy_value" INTEGER NOT NULL,
    "sell_value" INTEGER NOT NULL,

    CONSTRAINT "market_tick_symbol_action_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_tick_job_info" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "type" VARCHAR NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "try_count" SMALLINT NOT NULL,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "market_tick_job_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_tick_symbol_action_info_symbol_ts_key" ON "market_tick_symbol_action_info"("symbol", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "market_tick_job_info_date_type_symbol_key" ON "market_tick_job_info"("date", "type", "symbol");

-- AddForeignKey
ALTER TABLE "market_tick_symbol_action_info" ADD CONSTRAINT "market_tick_symbol_action_info_ts_fkey" FOREIGN KEY ("ts") REFERENCES "market_tick_action_info"("ts") ON DELETE CASCADE ON UPDATE CASCADE;
