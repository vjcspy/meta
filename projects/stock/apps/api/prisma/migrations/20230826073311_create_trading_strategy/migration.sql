-- CreateTable
CREATE TABLE "trading_strategy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "hash" TEXT NOT NULL,
    "meta" JSONB,
    "state" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trading_strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trading_strategy_process" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "meta" JSONB,
    "state" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "trading_strategy_id" INTEGER NOT NULL,

    CONSTRAINT "trading_strategy_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trading_strategy_action" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "type" SMALLINT NOT NULL,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "trading_strategy_id" INTEGER NOT NULL,

    CONSTRAINT "trading_strategy_action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trading_strategy_hash_key" ON "trading_strategy"("hash");

-- AddForeignKey
ALTER TABLE "trading_strategy_process" ADD CONSTRAINT "trading_strategy_process_trading_strategy_id_fkey" FOREIGN KEY ("trading_strategy_id") REFERENCES "trading_strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trading_strategy_action" ADD CONSTRAINT "trading_strategy_action_trading_strategy_id_fkey" FOREIGN KEY ("trading_strategy_id") REFERENCES "trading_strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
