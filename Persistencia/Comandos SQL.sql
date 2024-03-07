USE backendaluno0pfsii;

CREATE TABLE cliente (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);


-- Tabela para armazenar os pedidos
CREATE TABLE pedido (
    codigo INT PRIMARY KEY AUTO_INCREMENT, 
    cliente_codigo INT,
    total DECIMAL(10, 2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_CLIENTE FOREIGN KEY (cliente_codigo) REFERENCES cliente(codigo)
);

-- Tabela para armazenar os itens do pedido
CREATE TABLE pedido_produto (
    pedido_codigo INT NOT NULL,
    produto_codigo INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (pedido_codigo, produto_codigo),
    CONSTRAINT FK_PEDIDO FOREIGN KEY (pedido_codigo) REFERENCES pedido(codigo),
    CONSTRAINT FK_PRODUTO FOREIGN KEY (produto_codigo) REFERENCES produto(prod_codigo)
);

