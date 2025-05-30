/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,userId,restaurantId]` on the table `SessionChoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,guestName,restaurantId]` on the table `SessionChoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,userId,customEntry]` on the table `SessionChoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,guestName,customEntry]` on the table `SessionChoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SessionChoice_sessionId_userId_guestName_restaurantId_custo_key";

-- CreateIndex
CREATE UNIQUE INDEX "SessionChoice_sessionId_userId_restaurantId_key" ON "SessionChoice"("sessionId", "userId", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionChoice_sessionId_guestName_restaurantId_key" ON "SessionChoice"("sessionId", "guestName", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionChoice_sessionId_userId_customEntry_key" ON "SessionChoice"("sessionId", "userId", "customEntry");

-- CreateIndex
CREATE UNIQUE INDEX "SessionChoice_sessionId_guestName_customEntry_key" ON "SessionChoice"("sessionId", "guestName", "customEntry");
