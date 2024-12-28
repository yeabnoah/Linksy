/*
  Warnings:

  - You are about to drop the column `hash` on the `Folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "hash";

-- CreateTable
CREATE TABLE "FolderLink" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,
    "allowed" BOOLEAN NOT NULL,

    CONSTRAINT "FolderLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FolderLink_folderId_key" ON "FolderLink"("folderId");

-- AddForeignKey
ALTER TABLE "FolderLink" ADD CONSTRAINT "FolderLink_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
