-- CreateTable
CREATE TABLE "simple_stock_price" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "priceHigh" INTEGER NOT NULL,
    "priceLow" INTEGER NOT NULL,
    "priceOpen" INTEGER NOT NULL,
    "priceClose" INTEGER NOT NULL,
    "netChange" INTEGER NOT NULL,
    "pctChange" REAL NOT NULL,
    "volume" INTEGER NOT NULL,
    "buyForeignQuantity" INTEGER NOT NULL,
    "buyForeignValue" INTEGER NOT NULL,
    "sellForeignQuantity" INTEGER NOT NULL,
    "sellForeignValue" INTEGER NOT NULL,
    "foreignNetBuySellValue" INTEGER NOT NULL,
    "currentForeignRoom" BIGINT,

    CONSTRAINT "simple_stock_price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "simple_stock_price_symbol_date_key" ON "simple_stock_price"("symbol", "date");
