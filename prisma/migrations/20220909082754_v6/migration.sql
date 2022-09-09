/*
  Warnings:

  - You are about to drop the column `plan` on the `userinfo` table. All the data in the column will be lost.
  - Added the required column `planId` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userinfo` DROP COLUMN `plan`,
    ADD COLUMN `planId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `UserInfo_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Priceing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
