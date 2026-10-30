module.exports = class Restaurante {
    #idRestaurante;
    #nomeRestaurante;
    #telefoneRestaurante;
    #enderecoRestaurante;
    constructor() {
        console.log("⬆️  Restaurante.constructor()");
    }

    getIdRestaurante() {
        return this.#idRestaurante;
    }

    setIdRestaurante(novoIdRestaurante) {

        const parsed = Number(novoIdRestaurante);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idRestaurante deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idRestaurante tem que ser maior que 0");
        }
        return this.#idRestaurante = parsed;
    }

    getNomeRestaurante() {
        return this.#nomeRestaurante;
    }
    
    setNomeRestaurante(novoNomeRestaurante) {
        if (typeof novoNomeRestaurante !== "string") {
            throw new Error("nomeRestaurante deve ser uma string");
        }
        const nome = novoNomeRestaurante.trim();
        if (nome.lenght < 6) {
            throw new Error("nomeRestaurante deve ter mais de 6 caracteres");
        }
        if (nome.lenght > 64) {
            throw new Error("nomeRestaurante deve menos de 64 caracteres");
        }

        return this.#nomeRestaurante = nome;
    }

    getTelefoneRestaurante() {
        return this.#telefoneRestaurante;
    }

    setTelefoneRestaurante(novoTelefoneRestaurante) {
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

    getEnderecoRestaurante() {
        return this.#enderecoRestaurante;
    }

    setEnderecoRestaurante(novoEnderecoRestaurante) {
        if (typeof novoEnderecoRestaurante !== "string") {
            throw new Error("enderecoRestaurante deve ser uma string");
        }
        const endereco = novoEnderecoRestaurante.trim();

        if (endereco.length < 5) {
            throw new Error("enderecoRestaurante deve ter no minimo 5 caracteres");
        }
        if (endereco.length > 24) {
            throw new Error("enderecoRestaurante deve ter no maximo 24 caracteres");
        }
        return this.#enderecoRestaurante = endereco;
    }
}