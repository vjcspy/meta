/*
  Warnings:

  - Added the required column `price` to the `market_tick_symbol_action_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "market_tick_symbol_action_info" ADD COLUMN     "price" INTEGER NOT NULL;
