-- CreateTable
CREATE TABLE `compras_produtos` (
    `id` CHAR(36) NOT NULL,
    `usuarioID` CHAR(36) NOT NULL,
    `produtoID` CHAR(36) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnit` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compras_produtos` ADD CONSTRAINT `compras_produtos_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras_produtos` ADD CONSTRAINT `compras_produtos_produtoID_fkey` FOREIGN KEY (`produtoID`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
