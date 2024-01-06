-- CreateTable
CREATE TABLE `Institute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `mobileVerified` BOOLEAN NOT NULL DEFAULT false,
    `email` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `blocked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Institute_code_key`(`code`),
    UNIQUE INDEX `Institute_mobile_key`(`mobile`),
    UNIQUE INDEX `Institute_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
