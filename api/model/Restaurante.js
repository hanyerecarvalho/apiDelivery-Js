module.exports = class Cliente {
    constructor() {
        this._idRestaurante = null;
        this._nomeRestaurante = null;
        this._telefoneRestaurante = null;
        this._enderecoRestaurante = null;
    }

    getIdRestaurante() {
        return this._idRestaurante;
    }

    setIdRestaurante(novoIdRestaurante) {

        const parsed = Number(novoIdRestaurante);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idCargo deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idRestaurante tem que ser maior que 0");
        }
        return this._idRestaurante = parsed;
    }

    getNomeRestaurante() {
        return this._nomeRestaurante;
    }
    
    setNomeCliente(novoNomeRestaurante) {
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

        return this._nomeCliente = nome;
    }

    getTelefoneCliente() {
        return this._telefoneCliente;
    }

    setTelefoneCliente(novoTelefoneCliente) {
        if (typeof novoTelefoneCliente !== "string") {
            throw new Error("telefoneRestaurante deve ser uma string");
        }
        const telefone = novoTelefoneCliente.trim();

        if (telefone.length < 5) {
            throw new Error("telefoneRestaurante deve ter no minimo 5 caracteres");
        }
        if (telefone.length > 24) {
            throw new Error("telefoneRestaurante deve ter no maximo 24 caracteres");
        }
        return this._telefoneCliente = telefone;
    }
}