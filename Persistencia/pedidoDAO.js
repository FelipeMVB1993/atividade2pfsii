import Pedido from "../Modelo/pedido.js";
import Cliente from "../Modelo/cliente.js";
import Autor from "../Modelo/autor.js";
import Livro from "../Modelo/livro.js";
import ItemPedido from "../Modelo/itemPedido.js";
import conectar from "./conexao.js";

export default class PedidoDao {
    async gravar(pedido) {
        //um pedido no banco de dados grava registro na tabela pedido e também na tabela pedido_produto
        if (pedido instanceof Pedido) {
            const conexao = await conectar();
            //garantir a transação das operações para que seja realizada de forma atômica
            await conexao.beginTransaction();
            try {
                //inserir na tabela pedido
                const sql = 'INSERT INTO pedido(cliente_codigo, data_pedido, total) VALUES(?,str_to_date(?,"%d/%m/%Y"),?)';
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.total];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertId;
                //inserir na tabela item pedido
                const sql2 = 'INSERT INTO pedido_produto(pedido_codigo, produto_codigo, quantidade, preco_unitario) VALUES(?,?,?,?)';
                for (const item of pedido.itens) {
                    let parametros2 = [pedido.codigo, item.produto.codigo, item.quantidade, item.precoUnitario];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); //se chegou até aqui sem erros, confirmaremos as inclusões
            }
            catch (error) {
                await conexao.rollback(); //voltar o banco de dados ao estado anterior
                throw error; //throw = lançar
            }
        }

    }

    async alterar(pedido) {

    }

    async excluir(pedido) {

    }

    async consultar(termoBusca) {
        const listaPedidos = [];
        if (!isNaN(termoBusca)) { //assegurando que seja um código de pedido do tipo inteiro
            const conexao = await conectar();
            const sql = `SELECT p.codigo, p.cliente_codigo, p.data_pedido, p.total,
                        c.nome, c.endereco, c.telefone,
                        prod.prod_codigo, prod.prod_nome, prod.prod_precoCusto, prod.prod_precoVenda, prod.prod_dataCompra, prod.prod_qtdEstoque,
                        aut.aut_codigo, aut.aut_genero,
                        i.produto_codigo, i.quantidade, i.preco_unitario, i.quantidade * i.preco_unitario as subtotal
                        FROM pedido as p
                        INNER JOIN cliente as c ON p.cliente_codigo = c.codigo
                        INNER JOIN pedido_produto as i ON i.pedido_codigo = p.codigo
                        INNER JOIN produto as prod ON prod.prod_codigo = i.produto_codigo
                        INNER JOIN autor as aut ON prod.aut_codigo = aut.aut_codigo
                        WHERE p.codigo = ?`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);

            if (registros.length > 0) {

                // a partir dos registros precisaremos restaurar os objetos
                const cliente = new Cliente(registros[0].cliente_codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
                let listaItensPedido = [];
                for (const registro of registros) {
                    const autor = new Autor(registro.aut_codigo, registro.aut_genero);
                    const produto = new Livro(registro.prod_codigo, registro.prod_nome, registro.prod_precoCusto, registro.prod_precoVenda, registro.prod_dataCompra, registro.prod_qtdEstoque, autor);
                    const itemPedido = new ItemPedido(produto, registro.quantidade, registro.preco_unitario, registro.subtotal);
                    listaItensPedido.push(itemPedido);

                }
                const pedido = new Pedido(registros[0].codigo, cliente, registros[0].data_pedido, registros[0].total, listaItensPedido);
                listaPedidos.push(pedido);
            }

        }

        return listaPedidos;

    }
}