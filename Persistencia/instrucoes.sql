CREATE TABLE autor(
    aut_codigo INT NOT NULL AUTO_INCREMENT,
    aut_genero VARCHAR(100) NOT NULL,
    CONSTRAINT pk_autor PRIMARY KEY(aut_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_nome VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataCompra DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    aut_codigo INT NOT NULL,
    CONSTRAINT pk_livro PRIMARY KEY(prod_codigo),
);


INSERT INTO produto (prod_nome, prod_precoCusto, prod_precoVenda, prod_dataCompra, prod_qtdEstoque, aut_codigo)
VALUES
    ('Dom Casmurro', 10.00, 25.00, '2024-03-07', 10, 1),
    ('Harry Potter', 10.00, 15.00, '2024-05-12', 15, 2),
    ('Odisseia', 20.00, 30.00, '2024-01-16', 12, 3);

