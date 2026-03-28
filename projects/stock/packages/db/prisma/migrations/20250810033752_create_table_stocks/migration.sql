-- CreateTable
CREATE TABLE "public"."stock_info_stocks" (
    "id" SERIAL NOT NULL,
    "refId" INTEGER,
    "catId" INTEGER,
    "code" VARCHAR(255) NOT NULL,
    "exchange" VARCHAR(255) NOT NULL,
    "industryName1" VARCHAR(255),
    "industryName2" VARCHAR(255),
    "industryName3" VARCHAR(255),
    "totalShares" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "firstTradeDate" DATE,

    CONSTRAINT "stock_info_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_info_stocks_code_key" ON "public"."stock_info_stocks"("code");
