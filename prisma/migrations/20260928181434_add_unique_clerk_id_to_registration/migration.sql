/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Registration_clerkId_key" ON "Registration"("clerkId");
