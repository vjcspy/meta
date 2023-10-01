-- CreateTable
CREATE TABLE "results" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "stock_alerts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" VARCHAR(10),
    "conditions" JSONB NOT NULL,
    "state" SMALLINT NOT NULL,

    CONSTRAINT "stock_alerts_pkey" PRIMARY KEY ("id")
);
