-- CreateTable
CREATE TABLE "flag" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL DEFAULT '_',
    "key" VARCHAR NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flag_type_key_key" ON "flag"("type", "key");
