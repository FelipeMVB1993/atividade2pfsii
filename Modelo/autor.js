import AutorDAO from "../Persistencia/autorDAO.js";
//não esqueça do .js no final da importação

export default class Autor {
    //definição dos atributos privados
    #codigo;
    #genero;

    constructor(codigo=0, genero=''){
        this.#codigo=codigo;
        this.#genero=genero;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get genero(){
        return this.#genero;
    }

    set genero(novoGenero){
        this.#genero = novoGenero;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            genero:this.#genero
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const autDAO = new AutorDAO();
        await autDAO.gravar(this);
    }

    async excluir(){
        const autDAO = new AutorDAO();
        await autDAO.excluir(this);
    }

    async atualizar(){
        const autDAO = new AutorDAO();
        await autDAO.atualizar(this);

    }

    async consultar(parametro){
        const autDAO = new AutorDAO();
        return await autDAO.consultar(parametro);
    }
}