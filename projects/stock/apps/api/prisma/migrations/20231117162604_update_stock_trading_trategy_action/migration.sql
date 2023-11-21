/*
  Warnings:

  - A unique constraint covering the columns `[symbol,type,date,trading_strategy_id]` on the table `trading_strategy_action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `trading_strategy_action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trading_strategy_action" ADD COLUMN     "date" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "trading_strategy_action_symbol_type_date_trading_strategy_i_key" ON "trading_strategy_action"("symbol", "type", "date", "trading_strategy_id");
