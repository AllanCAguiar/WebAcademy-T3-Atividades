/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cpf` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(11)`.
  - You are about to alter the column `num_celular` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(11)`.
  - You are about to alter the column `forma_pagamento` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - The primary key for the `ComprasLista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `modelo` on the `ComprasLista` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `cpf_cliente` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(11)`.
  - You are about to alter the column `estado` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `cidade` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `cep` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(8)`.
  - You are about to alter the column `num_residencia` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(5)`.
  - The primary key for the `NumeroSerie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `modelo` on the `NumeroSerie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `numero_serie` on the `NumeroSerie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `modelo` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `categoria` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `subcategoria` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `fabricante` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.

*/
-- DropForeignKey
ALTER TABLE `ComprasLista` DROP FOREIGN KEY `ComprasLista_modelo_fkey`;

-- DropForeignKey
ALTER TABLE `Endereco` DROP FOREIGN KEY `Endereco_cpf_cliente_fkey`;

-- DropForeignKey
ALTER TABLE `NumeroSerie` DROP FOREIGN KEY `NumeroSerie_modelo_fkey`;

-- AlterTable
ALTER TABLE `Cliente` DROP PRIMARY KEY,
    MODIFY `cpf` CHAR(11) NOT NULL,
    MODIFY `nome_completo` VARCHAR(200) NOT NULL,
    MODIFY `num_celular` CHAR(11) NOT NULL,
    MODIFY `email` VARCHAR(200) NOT NULL,
    MODIFY `data_nascimento` DATE NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- AlterTable
ALTER TABLE `Compra` MODIFY `data` DATE NOT NULL,
    MODIFY `hora` TIME NOT NULL,
    MODIFY `desconto` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    MODIFY `forma_pagamento` VARCHAR(45) NOT NULL,
    MODIFY `total` DECIMAL(11, 2) NOT NULL;

-- AlterTable
ALTER TABLE `ComprasLista` DROP PRIMARY KEY,
    MODIFY `modelo` VARCHAR(45) NOT NULL,
    MODIFY `preco_unitario` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`idCompra`, `modelo`);

-- AlterTable
ALTER TABLE `Endereco` MODIFY `cpf_cliente` CHAR(11) NOT NULL,
    MODIFY `estado` VARCHAR(45) NOT NULL,
    MODIFY `cidade` VARCHAR(45) NOT NULL,
    MODIFY `cep` CHAR(8) NOT NULL,
    MODIFY `num_residencia` CHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `NumeroSerie` DROP PRIMARY KEY,
    MODIFY `modelo` VARCHAR(45) NOT NULL,
    MODIFY `numero_serie` VARCHAR(45) NOT NULL,
    ADD PRIMARY KEY (`modelo`, `numero_serie`);

-- AlterTable
ALTER TABLE `Produto` DROP PRIMARY KEY,
    MODIFY `modelo` VARCHAR(45) NOT NULL,
    MODIFY `categoria` VARCHAR(45) NOT NULL,
    MODIFY `subcategoria` VARCHAR(45) NOT NULL,
    MODIFY `fabricante` VARCHAR(45) NOT NULL,
    MODIFY `preco` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`modelo`);

-- AddForeignKey
ALTER TABLE `NumeroSerie` ADD CONSTRAINT `NumeroSerie_modelo_fkey` FOREIGN KEY (`modelo`) REFERENCES `Produto`(`modelo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cpf_cliente_fkey` FOREIGN KEY (`cpf_cliente`) REFERENCES `Cliente`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComprasLista` ADD CONSTRAINT `ComprasLista_modelo_fkey` FOREIGN KEY (`modelo`) REFERENCES `Produto`(`modelo`) ON DELETE RESTRICT ON UPDATE CASCADE;
