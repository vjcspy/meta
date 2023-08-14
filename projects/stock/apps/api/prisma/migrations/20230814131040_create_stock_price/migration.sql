/*
  Warnings:

  - You are about to drop the `stock_price_entity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stock_price_entity";

-- CreateTable
CREATE TABLE "stock_price" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "priceHigh" INTEGER NOT NULL,
    "priceLow" INTEGER NOT NULL,
    "priceOpen" INTEGER NOT NULL,
    "priceAverage" INTEGER NOT NULL,
    "priceClose" INTEGER NOT NULL,
    "pricePreviousClose" INTEGER NOT NULL,
    "priceBasic" INTEGER NOT NULL,
    "totalVolume" INTEGER NOT NULL,
    "dealVolume" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "putthroughVolume" INTEGER NOT NULL,
    "totalTrade" BIGINT NOT NULL,
    "totalValue" BIGINT NOT NULL,
    "putthroughValue" BIGINT NOT NULL,
    "buyForeignQuantity" INTEGER NOT NULL,
    "buyForeignValue" BIGINT NOT NULL,
    "sellForeignQuantity" INTEGER NOT NULL,
    "sellForeignValue" BIGINT NOT NULL,
    "buyCount" INTEGER NOT NULL,
    "buyQuantity" INTEGER NOT NULL,
    "sellCount" INTEGER NOT NULL,
    "sellQuantity" INTEGER NOT NULL,
    "adjRatio" DECIMAL(8,3) NOT NULL,
    "adjClose" INTEGER NOT NULL,
    "adjOpen" INTEGER NOT NULL,
    "adjHigh" INTEGER NOT NULL,
    "adjLow" INTEGER NOT NULL,
    "currentForeignRoom" INTEGER NOT NULL,

    CONSTRAINT "stock_price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_price_symbol_date_key" ON "stock_price"("symbol", "date");
