/*
  Warnings:

  - You are about to drop the column `foreignNetBuySellValue` on the `simple_stock_price` table. All the data in the column will be lost.
  - You are about to drop the column `netChange` on the `simple_stock_price` table. All the data in the column will be lost.
  - You are about to drop the column `pctChange` on the `simple_stock_price` table. All the data in the column will be lost.
  - Added the required column `dealVolume` to the `simple_stock_price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAverage` to the `simple_stock_price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceBasic` to the `simple_stock_price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `simple_stock_price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "simple_stock_price" DROP COLUMN "foreignNetBuySellValue",
DROP COLUMN "netChange",
DROP COLUMN "pctChange",
ADD COLUMN     "dealVolume" INTEGER NOT NULL,
ADD COLUMN     "priceAverage" INTEGER NOT NULL,
ADD COLUMN     "priceBasic" INTEGER NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;
