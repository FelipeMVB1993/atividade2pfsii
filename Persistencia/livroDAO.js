import Livro from '../Modelo/livro.js';
import Autor from '../Modelo/autor.js';
import conectar from './conexao.js';

export default class ProdutoDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `INSERT INTO produto(prod_nome, prod_precoCusto,
                prod_precoVenda, prod_dataCompra, prod_qtdEstoque, aut_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [livro.nome, livro.precoCusto, livro.precoVenda,
            livro.dataCompra, livro.qtdEstoque, livro.autor.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `UPDATE produto SET prod_nome = ?, prod_precoCusto = ?,
            prod_precoVenda = ?, prod_dataCompra = ?, prod_qtdEstoque = ?, aut_codigo = ?
            WHERE prod_codigo = ?`;
            const parametros = [livro.nome, livro.precoCusto, livro.precoVenda,
            livro.dataCompra, livro.qtdEstoque, livro.autor.codigo, livro.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = `DELETE FROM produto WHERE prod_codigo = ?`;
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaProdutos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do produto
            const sql = `SELECT l.prod_codigo, l.prod_nome,
              l.prod_precoCusto, l.prod_precoVenda, l.prod_dataCompra, 
              l.prod_qtdEstoque, a.aut_codigo, a.aut_genero
              FROM produto l 
              INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
              WHERE l.prod_codigo = ?
              ORDER BY l.prod_nome               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const autor = new Autor(registro.aut_codigo, registro.aut_genero);
                const livro = new Livro(registro.prod_codigo,registro.prod_nome,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_dataCompra, registro.prod_qtdEstoque,
                                            autor
                                            );
                listaProdutos.push(livro);
            }
        }
        else
        {
            //consulta pela descrição do produto
            const sql = `SELECT l.prod_codigo, l.prod_nome,
              l.prod_precoCusto, l.prod_precoVenda, l.prod_dataCompra, 
              l.prod_qtdEstoque, a.aut_codigo, a.aut_genero
              FROM produto l 
              INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
              WHERE l.prod_nome like ?
              ORDER BY l.prod_nome               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const autor = new Autor(registro.aut_codigo, registro.aut_genero);
                const livro = new Livro(registro.prod_codigo,registro.prod_nome,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_dataCompra, registro.prod_qtdEstoque,
                                            autor
                                            );
                listaProdutos.push(livro);
            }
        }

        return listaProdutos;
    }
}