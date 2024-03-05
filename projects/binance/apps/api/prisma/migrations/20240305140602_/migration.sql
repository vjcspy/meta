/*
  Warnings:

  - You are about to drop the column `fail` on the `strategy_history_test_result` table. All the data in the column will be lost.
  - You are about to drop the column `pass` on the `strategy_history_test_result` table. All the data in the column will be lost.
  - You are about to drop the column `unknown` on the `strategy_history_test_result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "strategy_history_test_result" DROP COLUMN "fail",
DROP COLUMN "pass",
DROP COLUMN "unknown",
ADD COLUMN     "fail_count" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "pass_count" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "unknown_count" SMALLINT NOT NULL DEFAULT 0;
