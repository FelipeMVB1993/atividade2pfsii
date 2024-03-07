export default class Cliente {
    #codigo;
    #nome;
    #telefone;
    #endereco;

    constructor(codigo, nome, telefone, endereco) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
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

    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome === "") {
            console.log("Dado não preenchido");
        } else {
            this.#nome = novoNome;
        }
    }

    // Telefone
    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if (novoTelefone === "" || novoTelefone.length !== 11) {
            console.log("Formato de telefone inválido");
        } else {
            this.#telefone = novoTelefone;
        }
    }

    // Endereço
    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if (novoEndereco === "") {
            console.log("Dado não preenchido");
        } else {
            this.#endereco = novoEndereco;
        }
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'nome': this.#nome,
            'telefone': this.#telefone,
            'endereco': this.#endereco
        };
    }

    async gravar() {
        const clienteDAO = new ClienteDAO();
        this.codigo = await clienteDAO.adicionar(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }

    async apagar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.deletar(this);
    }

    async consultarPorNome(nome) {
        const clienteDAO = new ClienteDAO();
        const listaClientes = await clienteDAO.consultar(nome);
        return listaClientes;
    }

    async consultarPorTelefone(telefone) {
        const clienteDAO = new ClienteDAO();
        const listaClientes = await clienteDAO.consultarTelefone(telefone);
        return listaClientes;
    }
}