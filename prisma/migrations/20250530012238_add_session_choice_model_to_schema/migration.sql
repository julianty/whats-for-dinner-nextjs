/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,userId,guestName,restaurantId,customEntry]` on the table `SessionChoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionChoice_sessionId_userId_guestName_restaurantId_custo_key" ON "SessionChoice"("sessionId", "userId", "guestName", "restaurantId", "customEntry");
