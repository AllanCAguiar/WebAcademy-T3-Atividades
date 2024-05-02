-- CreateTable
CREATE TABLE `produtos` (
    `id` CHAR(36) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `estoque` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `produtos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` CHAR(36) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `tipoUsuarioID` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_usuarios` (
    `id` CHAR(36) NOT NULL,
    `rotulo` CHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_tipoUsuarioID_fkey` FOREIGN KEY (`tipoUsuarioID`) REFERENCES `tipos_usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
