/*
  Warnings:

  - You are about to drop the `stock_price_sync_status_entity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stock_price_sync_status_entity";

-- CreateTable
CREATE TABLE "Flag" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("key")
);
