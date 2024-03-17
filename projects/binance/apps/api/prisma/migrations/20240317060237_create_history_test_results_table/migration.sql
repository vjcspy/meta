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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strategy_history_test_result_pkey" PRIMARY KEY ("id")
);
