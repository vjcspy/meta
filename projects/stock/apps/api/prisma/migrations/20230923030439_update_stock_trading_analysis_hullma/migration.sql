-- AlterTable
ALTER TABLE "stock_trading_analysis" ADD COLUMN     "l16_hullma_day_in_trend" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "l16_hullma_highest_diff_percent" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "l16_hullma_trend" SMALLINT NOT NULL DEFAULT 0;
