-- AlterTable
ALTER TABLE "strategy_history_test_result" ADD COLUMN     "best_leverage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "best_profit" DOUBLE PRECISION NOT NULL DEFAULT 0;
