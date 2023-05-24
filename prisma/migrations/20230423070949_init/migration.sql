/*
  Warnings:

  - You are about to drop the column `cronExpression` on the `job_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job_history" DROP COLUMN "cronExpression";

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "cronExpression" TEXT;
