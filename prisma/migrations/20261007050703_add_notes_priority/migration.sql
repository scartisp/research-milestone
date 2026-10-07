-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;
