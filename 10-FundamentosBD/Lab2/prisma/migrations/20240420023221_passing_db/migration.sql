-- CreateTable
CREATE TABLE `Cliente` (
    `cpf` VARCHAR(191) NOT NULL,
    `nome_completo` VARCHAR(191) NOT NULL,
    `num_celular` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_num_celular_key`(`num_celular`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `subcategoria` VARCHAR(191) NOT NULL,
    `fabricante` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`modelo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumeroSerie` (
    `modelo` VARCHAR(191) NOT NULL,
    `numero_serie` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`modelo`, `numero_serie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_cliente` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `num_residencia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `hora` DATETIME(3) NOT NULL,
    `desconto` DOUBLE NOT NULL DEFAULT 0.00,
    `forma_pagamento` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `endereco_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComprasLista` (
    `idCompra` INTEGER NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_unitario` DOUBLE NOT NULL,

    PRIMARY KEY (`idCompra`, `modelo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NumeroSerie` ADD CONSTRAINT `NumeroSerie_modelo_fkey` FOREIGN KEY (`modelo`) REFERENCES `Produto`(`modelo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cpf_cliente_fkey` FOREIGN KEY (`cpf_cliente`) REFERENCES `Cliente`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_endereco_id_fkey` FOREIGN KEY (`endereco_id`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComprasLista` ADD CONSTRAINT `ComprasLista_idCompra_fkey` FOREIGN KEY (`idCompra`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComprasLista` ADD CONSTRAINT `ComprasLista_modelo_fkey` FOREIGN KEY (`modelo`) REFERENCES `Produto`(`modelo`) ON DELETE RESTRICT ON UPDATE CASCADE;
