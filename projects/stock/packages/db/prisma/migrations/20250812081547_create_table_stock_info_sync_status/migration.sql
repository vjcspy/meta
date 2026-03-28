-- CreateTable
CREATE TABLE "public"."stock_info_sync_status" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "is_success" BOOLEAN NOT NULL,
    "number_of_try" INTEGER,
    "error" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "meta" JSONB,
    "page" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_info_sync_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_info_sync_status_key_key" ON "public"."stock_info_sync_status"("key");

-- CreateIndex
CREATE INDEX "stock_info_sync_status_key_idx" ON "public"."stock_info_sync_status"("key");
