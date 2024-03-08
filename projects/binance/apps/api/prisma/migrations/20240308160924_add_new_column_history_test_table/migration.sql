-- AlterTable
ALTER TABLE "strategy_history_test_result" ADD COLUMN     "note" TEXT,
ADD COLUMN     "result" TEXT,
ALTER COLUMN "data" DROP NOT NULL;
