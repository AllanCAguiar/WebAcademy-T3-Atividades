CREATE TABLE Cliente (
    rg CHAR(8) PRIMARY KEY,
    nome VARCHAR(100),
    telefone CHAR(11),
    sexo CHAR(1)
);

CREATE TABLE Quarto (
    numero CHAR(5) PRIMARY KEY,
    andar CHAR(3),
    tipo VARCHAR(45),
    descricao VARCHAR(255),
    preco DECIMAL(10, 2)
);

CREATE TABLE Reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_rg CHAR(8),
    quarto_numero CHAR(5),
    data_inicio DATE,
    quant_dias INT,
    FOREIGN KEY (cliente_rg) REFERENCES Cliente(rg),
    FOREIGN KEY (quarto_numero) REFERENCES Quarto(numero)
);

CREATE TABLE Ocupacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_entrada DATE,
    data_saida DATE,
    cliente_rg CHAR(8),
    quarto_numero CHAR(5),
    FOREIGN KEY (cliente_rg) REFERENCES Cliente(rg),
    FOREIGN KEY (quarto_numero) REFERENCES Quarto(numero)

);

CREATE TABLE Servico (
    ocupacao_id INT,
    codigo VARCHAR(20) PRIMARY KEY,
    tipo VARCHAR(45),
    descricao VARCHAR(255),
    valor DECIMAL(10, 2),
    FOREIGN KEY (ocupacao_id) REFERENCES Ocupacao(id)
);
