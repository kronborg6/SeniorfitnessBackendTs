/*
  Warnings:

  - You are about to drop the column `token` on the `token` table. All the data in the column will be lost.
  - Added the required column `tokenn` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` DROP COLUMN `token`,
    ADD COLUMN `tokenn` VARCHAR(191) NOT NULL;
