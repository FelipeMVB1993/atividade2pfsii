import ProdutoDAO from "../Persistencia/livroDAO.js";

export default class Livro{
    #codigo;
    #nome;
    #precoCusto;
    #precoVenda;
    #dataCompra;
    #qtdEstoque;
    #autor; //é um objeto do tipo categoria

    constructor(codigo=0,nome="", precoCusto=0, 
                precoVenda=0,dataCompra='', qtdEstoque=0,
                autor={}
                ){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#dataCompra=dataCompra;
        this.#qtdEstoque=qtdEstoque;
        this.#autor=autor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome=novoNome;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    
    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco
    }

    get dataCompra(){
        return this.#dataCompra;
    }

    set dataCompra(novaDataCompra){
        this.#dataCompra = novaDataCompra;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get autor(){
        return this.#autor;
    }

    set autor(novoAutor){
        this.#autor = novoAutor;
    }

    //override do método toJSON
    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            dataCompra:this.#dataCompra,
            qtdEstoque:this.#qtdEstoque,
            autor:this.#autor
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.gravar(this);
     }
 
     async excluir(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
     }
 
     async atualizar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.atualizar(this);
     }
 
     async consultar(termo){
        const prodDAO = new ProdutoDAO();
        return await prodDAO.consultar(termo);
     }

}