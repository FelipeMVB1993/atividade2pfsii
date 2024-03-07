import Livro from "../Modelo/livro.js";

export default class LivroCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataCompra = dados.dataCompra;
            const qtdEstoque = dados.qtdEstoque;
            const autor = dados.autor;

            
            if (nome && precoCusto > 0 && precoVenda > 0 && dataCompra
                && qtdEstoque >= 0 && autor) {
                const livro = new Livro(0, nome, precoCusto,
                    precoVenda, dataCompra, qtdEstoque, autor
                );
                //resolver a promise
                livro.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": livro.codigo,
                        "mensagem": "Livro incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o livro:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do livro segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um livro!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataCompra = dados.dataCompra;
            const qtdEstoque = dados.qtdEstoque;
            const autor = dados.autor;
            if (codigo && nome && precoCusto > 0 && precoVenda > 0 && dataCompra
                && qtdEstoque >= 0 && autor) {
                const livro = new Livro(codigo, nome, precoCusto,
                    precoVenda, dataCompra, qtdEstoque, autor);
                //resolver a promise
                livro.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o livro:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do livro segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um livro!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const livro = new Livro(codigo);
                //resolver a promise
                livro.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o Livro:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um livro!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const livro = new Livro();
            livro.consultar(termo).then((listaLivros) => {
                resposta.json(
                    {
                        status: true,
                        listaLivros
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os livros: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar livros!"
            });
        }
    }
}