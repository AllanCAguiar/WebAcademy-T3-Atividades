CREATE TABLE `Cliente` (
	`cpf` char(11) NOT NULL,
	`nome_completo` varchar(200) NOT NULL,
	`num_celular` char(11) NOT NULL,
	`email` varchar(200) NOT NULL,
	`data_nascimento` date NOT NULL,
	PRIMARY KEY (`cpf`),
	UNIQUE KEY `num_celular_UNIQUE` (`num_celular`),
	UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `Produto` (
	`modelo` varchar(45) NOT NULL,
	`categoria` varchar(45) NOT NULL,
	`subcategoria` varchar(45) NOT NULL,
	`fabricante` varchar(45) NOT NULL,
	`preco` decimal(10,2) NOT NULL,
	`quantidade` int NOT NULL,
	PRIMARY KEY (`modelo`)
);

CREATE TABLE `NumeroSerie` (
	`modelo` varchar(45) NOT NULL,
	`numero_serie` varchar(45) NOT NULL,
	PRIMARY KEY (`modelo`,`numero_serie`),
	CONSTRAINT `fk_numeroModelo` FOREIGN KEY (`modelo`) REFERENCES `Produto` (`modelo`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE TABLE `Endereco` (
	`id_endereco` INT NOT NULL AUTO_INCREMENT,
	`cpf_cliente` char(11) NOT NULL,
	`estado` varchar(45) NOT NULL,
	`cidade` varchar(45) NOT NULL,
	`cep` char(8) NOT NULL,
	`num_residencia` char(5) NOT NULL,
	PRIMARY KEY (`id_endereco`),
	CONSTRAINT `fk_cpfEndereco` FOREIGN KEY (`cpf_cliente`) REFERENCES `Cliente` (`cpf`) ON DELETE CASCADE ON UPDATE RESTRICT
);

CREATE TABLE `Compra` (
	`id` int NOT NULL AUTO_INCREMENT,
	`data` date NOT NULL,
	`hora` time NOT NULL,
	`desconto` decimal(4,2) DEFAULT '0.00',
	`forma_pagamento` varchar(45) NOT NULL,
	`total` decimal(11,2) NOT NULL,
	`id_endereco`  INT NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_Compra_1_idx` (`id_endereco`),
	CONSTRAINT `fk_Compra_1` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco` (`id_endereco`)
) ;

CREATE TABLE `ComprasLista` (
	`idCompra` int NOT NULL,
	`modelo` varchar(45) NOT NULL,
	`quantidade` int NOT NULL,
	`preco_unitario` decimal(10,2) NOT NULL,
	PRIMARY KEY (`idCompra`,`modelo`),
	KEY `fk_ComprasLista_1_idx` (`modelo`),
	CONSTRAINT `fk_ComprasLista_1` FOREIGN KEY (`modelo`) REFERENCES `Produto` (`modelo`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `fk_ComprasLista_2` FOREIGN KEY (`idCompra`) REFERENCES `Compra` (`id`)
);