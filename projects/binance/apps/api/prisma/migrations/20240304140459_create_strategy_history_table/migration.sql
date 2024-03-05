-- CreateTable
CREATE TABLE "strategy_history_test_result" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "pass" SMALLINT NOT NULL DEFAULT 0,
    "fail" SMALLINT NOT NULL DEFAULT 0,
    "unknown" SMALLINT NOT NULL DEFAULT 0,
    "profit" DOUBLE PRECISION NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strategy_history_test_result_pkey" PRIMARY KEY ("id")
);
