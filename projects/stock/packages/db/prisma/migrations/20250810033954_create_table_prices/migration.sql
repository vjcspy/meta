-- CreateTable
CREATE TABLE "public"."stock_info_prices" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "priceBasic" INTEGER NOT NULL,
    "priceHigh" INTEGER NOT NULL,
    "priceLow" INTEGER NOT NULL,
    "priceOpen" INTEGER NOT NULL,
    "priceClose" INTEGER NOT NULL,
    "priceAverage" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "dealVolume" INTEGER NOT NULL,
    "buyForeignQuantity" INTEGER NOT NULL,
    "buyForeignValue" INTEGER NOT NULL,
    "sellForeignQuantity" INTEGER NOT NULL,
    "sellForeignValue" INTEGER NOT NULL,
    "currentForeignRoom" BIGINT,

    CONSTRAINT "stock_info_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_info_prices_symbol_date_key" ON "public"."stock_info_prices"("symbol", "date");
