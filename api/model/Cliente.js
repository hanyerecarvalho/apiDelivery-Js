module.exports = class Cliente {
    #idCliente;
    #nomeCliente;
    #telefoneCliente;

    constructor() {
        console.log("⬆️  Cliente.constructor()");
    }

    get idCliente() {
        return this.#idCliente;
    }

    set idCliente(value) {
        const parsed = Number(value);
        if (!Number.isInteger(parsed)) {
            throw new Error("idCliente deve ser um numero inteiro");
        }
        if (parsed < 0) {
            throw new Error("idCliente tem que ser maior que 0");
        }
        this.#idCliente = parsed;
    }

    get nomeCliente() {
        return this.#nomeCliente;
    }
    
    set nomeCliente(value) {
        if (typeof value !== "string") {
            throw new Error("nomeCliente deve ser uma string.");
        }

        const nome = value.trim();
        if (nome.length > 45) {
            throw new Error("nomeCliente deve ter até 45 caracteres");
        }
        this.#nomeCliente = nome;
    }

    get telefoneCliente() {
        return this.#telefoneCliente;
    }

    set telefoneCliente(value) {
        if (typeof value !== "string") {
            throw new Error("telefoneCliente deve ser uma string.");
        }

        const telefone = value.trim();
        if (telefone.length < 5) {
            throw new Error("telefoneCliente deve ter mais de 5 caracteres");
        }
        if (telefone.length > 18) {
            throw new Error("telefoneCliente deve ter no maximo 18 caracteres");
        }
        this.#telefoneCliente = telefone;
    }
}
