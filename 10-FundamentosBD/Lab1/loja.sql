CREATE TABLE `Cliente` (
  `nome_completo` varchar(200) NOT NULL,
  `cpf` char(11) NOT NULL,
  `numero_celular` char(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE KEY `numero_celular_UNIQUE` (`numero_celular`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Produto` (
  `categoria` varchar(45) NOT NULL,
  `subcategoria` varchar(45) NOT NULL,
  `modelo` varchar(45) NOT NULL,
  `fabricante` varchar(45) NOT NULL,
  `preco_base` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`modelo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `Endereco` (
  `cpfCliente` char(11) NOT NULL,
  `endereco` varchar(200) NOT NULL,
  PRIMARY KEY (`cpfCliente`,`endereco`),
  CONSTRAINT `fk_cpfEndereco` FOREIGN KEY (`cpfCliente`) REFERENCES `Cliente` (`cpf`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `NumeroSerie` (
  `modelo` varchar(45) NOT NULL,
  `numeroSerie` varchar(45) NOT NULL,
  PRIMARY KEY (`modelo`,`numeroSerie`),
  CONSTRAINT `fk_modeloProduto` FOREIGN KEY (`modelo`) REFERENCES `Produto` (`modelo`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
