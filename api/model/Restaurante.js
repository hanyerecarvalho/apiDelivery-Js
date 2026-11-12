module.exports = class Restaurante {
    #idRestaurante;
    #nomeRestaurante;
    #telefoneRestaurante;
    #enderecoRestaurante;
    constructor() {
        console.log("⬆️  Restaurante.constructor()");
    }

    get idRestaurante() {
        return this.#idRestaurante;
    }

    set idRestaurante(novoIdRestaurante) {

        const parsed = Number(novoIdRestaurante);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idRestaurante deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idRestaurante tem que ser maior que 0");
        }
        return this.#idRestaurante = parsed;
    }

    get nomeRestaurante() {
        return this.#nomeRestaurante;
    }
    
    set nomeRestaurante(novoNomeRestaurante) {
        if (typeof novoNomeRestaurante !== "string") {
            throw new Error("nomeRestaurante deve ser uma string");
        }
        const nome = novoNomeRestaurante.trim();
        if (nome.length < 6) {
            throw new Error("nomeRestaurante deve ter mais de 6 caracteres");
        }
        if (nome.length > 45) {
            throw new Error("nomeRestaurante deve ter até 45 caracteres");
        }

        return this.#nomeRestaurante = nome;
    }

    get telefoneRestaurante() {
        return this.#telefoneRestaurante;
    }

    set telefoneRestaurante(novoTelefoneRestaurante) {
        if (typeof novoTelefoneRestaurante !== "string") {
            throw new Error("telefoneRestaurante deve ser uma string");
        }
        const telefone = novoTelefoneRestaurante.trim();

        if (telefone.length < 5) {
            throw new Error("telefoneRestaurante deve ter no minimo 5 caracteres");
        }
        if (telefone.length > 24) {
            throw new Error("telefoneRestaurante deve ter no maximo 24 caracteres");
        }
        return this.#telefoneRestaurante = telefone;
    }

    get enderecoRestaurante() {
        return this.#enderecoRestaurante;
    }

    set enderecoRestaurante(novoEnderecoRestaurante) {
        if (typeof novoEnderecoRestaurante !== "string") {
            throw new Error("enderecoRestaurante deve ser uma string");
        }
        const endereco = novoEnderecoRestaurante.trim();

        if (endereco.length < 5) {
            throw new Error("enderecoRestaurante deve ter no minimo 5 caracteres");
        }
        if (endereco.length > 100) {
            throw new Error("enderecoRestaurante deve ter até 100 caracteres");
        }
        return this.#enderecoRestaurante = endereco;
    }
}
