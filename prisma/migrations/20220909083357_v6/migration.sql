-- DropForeignKey
ALTER TABLE `userinfo` DROP FOREIGN KEY `UserInfo_planId_fkey`;

-- AlterTable
ALTER TABLE `userinfo` MODIFY `planId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `UserInfo_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Priceing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
