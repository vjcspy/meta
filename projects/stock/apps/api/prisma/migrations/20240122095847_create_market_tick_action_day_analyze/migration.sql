-- CreateTable
CREATE TABLE "market_tick_action_day_analyze" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "ts" INTEGER NOT NULL,
    "type" VARCHAR NOT NULL,
    "m" SMALLINT NOT NULL,

    CONSTRAINT "market_tick_action_day_analyze_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_tick_action_day_analyze_symbol_ts_type_key" ON "market_tick_action_day_analyze"("symbol", "ts", "type");
