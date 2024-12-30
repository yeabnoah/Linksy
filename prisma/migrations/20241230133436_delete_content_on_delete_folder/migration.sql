-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_folderId_fkey";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
