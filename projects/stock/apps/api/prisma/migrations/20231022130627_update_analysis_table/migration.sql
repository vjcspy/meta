-- AlterTable
ALTER TABLE "stock_trading_analysis" ADD COLUMN     "cap" BIGINT DEFAULT 0,
ADD COLUMN     "cur_gap_percent" SMALLINT NOT NULL DEFAULT 0;
