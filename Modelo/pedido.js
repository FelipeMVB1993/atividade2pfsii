import PedidoDAO from "../Persistencia/pedidoDAO.js";
export default class Pedido {
    #codigo;
    #cliente;
    #data;
    #total;
    #itens;

    constructor(codigo, cliente, data,  total, itens) {
        this.#codigo = codigo;
        this.#cliente = cliente;
        this.#data = data;
        this.#total = total;
        this.#itens = itens;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Código do Cliente
    get cliente() {
        return this.#cliente;
    }

    set cliente(novocliente) {
        this.#cliente = novocliente;
        
    }

    // Data
    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    // Total do Pedido
    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    // Produtos
    get itens() {
        return this.#itens;
    }

    set itens(novosItens) {
        this.#itens = novosItens;
    }
    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'cliente': this.#cliente,
            'data': this.#data,
            'total': this.#total,
            'itens': this.#itens

        };
    }

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        this.codigo = await pedidoDAO.gravar(this);
    }

    async atualizar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.atualizar(this);
    }

    async excluir() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.excluir(this);
    }

    async consultarTodos() {
        const pedidoDAO = new PedidoDAO();
        const listaPedidos = await pedidoDAO.consultarTodos();
        return listaPedidos;
    }

    async consultar(termoBusca) {
        const pedidoDAO = new PedidoDAO();
        const listaPedidos = await pedidoDAO.consultar(termoBusca);
        return listaPedidos;
    }
}
