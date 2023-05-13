-- CreateTable
CREATE TABLE "likes" (
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_coinId_key" ON "likes"("userId", "coinId");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
