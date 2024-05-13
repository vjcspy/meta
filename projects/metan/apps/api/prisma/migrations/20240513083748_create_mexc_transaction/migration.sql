-- CreateTable
CREATE TABLE "mex_transaction" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "direction" SMALLINT NOT NULL,
    "position" SMALLINT NOT NULL,
    "auto" SMALLINT NOT NULL,
    "ts" BIGINT NOT NULL,

    CONSTRAINT "mex_transaction_pkey" PRIMARY KEY ("id")
);
