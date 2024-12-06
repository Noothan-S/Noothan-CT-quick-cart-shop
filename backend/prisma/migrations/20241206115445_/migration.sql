/*
  Warnings:

  - You are about to drop the column `paymentId` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "payments_orderId_key" ON "payments"("orderId");
