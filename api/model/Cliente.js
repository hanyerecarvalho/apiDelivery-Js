module.exports = class Cliente {
    constructor() {
        this._idCliente = null;
        this._nomeCliente = null;
        this._telefoneCliente = null;
    }

    getIdCliente() {
        return this._idCliente;
    }

    setIdCliente(novoIdCliente) {
        if (novoIdCliente < 0) {
            throw new Error("idCliente tem que ser maior que 0");
        }
        return this._idCliente = novoIdCliente;
    }

    getNomeCliente() {
        return this._nomeCliente;
    }
    
    setNomeCliente(novoNomeCliente) {
        if (novoNomeCliente.lenght > 60) {
            throw new Error("idRestaurante tem que ter ate 60 caracteres");
        }
        return this._nomeCliente = novoNomeCliente;
    }

    getTelefoneCliente() {
        return this._telefoneCliente;
    }

    setTelefoneCliente(novoTelefoneCliente) {
        if (novoTelefoneCliente.lenght < 5) {
            throw new Error("telefoneCliente deve ter mais de 5 caracteres");
        }
        if (novoTelefoneCliente.lenght < 18) {
            throw new Error("telefoneCliente deve ter no maximo 18 caracteres");
        }
        return this._telefoneCliente = novoTelefoneCliente;
    }
}