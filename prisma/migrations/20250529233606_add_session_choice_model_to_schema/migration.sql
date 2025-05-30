-- CreateTable
CREATE TABLE "SessionChoice" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "guestName" TEXT,
    "restaurantId" TEXT,
    "customEntry" TEXT,
    "choice" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionChoice_sessionId_idx" ON "SessionChoice"("sessionId");

-- CreateIndex
CREATE INDEX "SessionChoice_userId_idx" ON "SessionChoice"("userId");

-- CreateIndex
CREATE INDEX "SessionChoice_restaurantId_idx" ON "SessionChoice"("restaurantId");

-- AddForeignKey
ALTER TABLE "SessionChoice" ADD CONSTRAINT "SessionChoice_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionChoice" ADD CONSTRAINT "SessionChoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionChoice" ADD CONSTRAINT "SessionChoice_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
