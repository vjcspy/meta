-- CreateTable
CREATE TABLE "public"."stock_info_ticks" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "date" DATE NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "stock_info_ticks_pkey" PRIMARY KEY ("id")
);
