module.exports = class Cliente {
    #idCliente;
    #nomeCliente;
    #telefoneCliente;
    constructor() {
        console.log("⬆️  Cliente.constructor()");
    }

    getIdCliente() {
        return this.#idCliente;
    }

    setIdCliente(novoIdCliente) {
        if (novoIdCliente < 0) {
            throw new Error("idCliente tem que ser maior que 0");
        }
        return this.#idCliente = novoIdCliente;
    }

    getNomeCliente() {
        return this.#nomeCliente;
    }
    
    setNomeCliente(novoNomeCliente) {
        if (novoNomeCliente.lenght > 60) {
            throw new Error("idRestaurante tem que ter ate 60 caracteres");
        }
        return this.#nomeCliente = novoNomeCliente;
    }

    getTelefoneCliente() {
        return this.#telefoneCliente;
    }

    setTelefoneCliente(novoTelefoneCliente) {
        if (novoTelefoneCliente.lenght < 5) {
            throw new Error("telefoneCliente deve ter mais de 5 caracteres");
        }
        if (novoTelefoneCliente.lenght < 18) {
            throw new Error("telefoneCliente deve ter no maximo 18 caracteres");
        }
        return this.#telefoneCliente = novoTelefoneCliente;
    }
}