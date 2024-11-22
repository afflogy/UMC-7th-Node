/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `missionstate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `missionstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mission_id` on the `missionstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `missionstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `paystate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `pay_id` on the `paystate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `paystate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `paystate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `pointstate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pointstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mission_id` on the `pointstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `pointstate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `map_id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `storecategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `storecategory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `storecategory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `usercategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `usercategory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `category_id` on the `usercategory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `userrsgionmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `region_mcount_id` on the `userrsgionmission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `map_id` on the `userrsgionmission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `userrsgionmission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Made the column `birth_date` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `Mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `missionstate` DROP FOREIGN KEY `MissionState_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `missionstate` DROP FOREIGN KEY `MissionState_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `paystate` DROP FOREIGN KEY `PayState_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `paystate` DROP FOREIGN KEY `PayState_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `pointstate` DROP FOREIGN KEY `PointState_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `pointstate` DROP FOREIGN KEY `PointState_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `Store_map_id_fkey`;

-- DropForeignKey
ALTER TABLE `storecategory` DROP FOREIGN KEY `StoreCategory_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `storecategory` DROP FOREIGN KEY `StoreCategory_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `usercategory` DROP FOREIGN KEY `UserCategory_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `usercategory` DROP FOREIGN KEY `UserCategory_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `userrsgionmission` DROP FOREIGN KEY `UserRsgionMission_map_id_fkey`;

-- DropForeignKey
ALTER TABLE `userrsgionmission` DROP FOREIGN KEY `UserRsgionMission_user_id_fkey`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `map` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `missionstate` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `mission_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `paystate` DROP PRIMARY KEY,
    MODIFY `pay_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`pay_id`);

-- AlterTable
ALTER TABLE `pointstate` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `mission_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `map_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `storecategory` DROP PRIMARY KEY,
    MODIFY `category_id` INTEGER NOT NULL,
    MODIFY `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`category_id`, `store_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `birth_date` VARCHAR(20) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usercategory` DROP PRIMARY KEY,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `category_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`, `category_id`);

-- AlterTable
ALTER TABLE `userrsgionmission` DROP PRIMARY KEY,
    MODIFY `region_mcount_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `map_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`region_mcount_id`);

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_map_id_fkey` FOREIGN KEY (`map_id`) REFERENCES `Map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionState` ADD CONSTRAINT `MissionState_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MissionState` ADD CONSTRAINT `MissionState_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCategory` ADD CONSTRAINT `UserCategory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCategory` ADD CONSTRAINT `UserCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreCategory` ADD CONSTRAINT `StoreCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreCategory` ADD CONSTRAINT `StoreCategory_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointState` ADD CONSTRAINT `PointState_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointState` ADD CONSTRAINT `PointState_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRsgionMission` ADD CONSTRAINT `UserRsgionMission_map_id_fkey` FOREIGN KEY (`map_id`) REFERENCES `Map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRsgionMission` ADD CONSTRAINT `UserRsgionMission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PayState` ADD CONSTRAINT `PayState_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PayState` ADD CONSTRAINT `PayState_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
