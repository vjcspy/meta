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
CREATE TABLE "market_symbol_tick_action_info" (
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

    CONSTRAINT "market_symbol_tick_action_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_tick_action_job_info" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "try_count" SMALLINT NOT NULL,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "market_tick_action_job_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_symbol_tick_action_info_symbol_ts_key" ON "market_symbol_tick_action_info"("symbol", "ts");

-- CreateIndex
CREATE UNIQUE INDEX "market_tick_action_job_info_date_key" ON "market_tick_action_job_info"("date");

-- AddForeignKey
ALTER TABLE "market_symbol_tick_action_info" ADD CONSTRAINT "market_symbol_tick_action_info_ts_fkey" FOREIGN KEY ("ts") REFERENCES "market_tick_action_info"("ts") ON DELETE CASCADE ON UPDATE CASCADE;
