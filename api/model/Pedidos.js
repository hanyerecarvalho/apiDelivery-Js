module.exports = class Pedidos {
    constructor() {
        this._idPedido = null;
        this._valorTotal = null;
        this._idCliente = null;
        this._idRestaurante = null;
    }

    getIdCliente() {
        return this._idCargo;
    }

    setIdCliente(novoIdCliente) {
        return this._idCliente = novoIdCliente;
    }

    getNomeCliente() {
        return this._nomeCliente;
    }
    
    setNomeCliente(novoNomeCliente) {
        return this._nomeCliente = novoNomeCliente;
    }

    getTelefoneCliente() {
        return this._telefoneCliente;
    }

    setTelefoneCliente(novoTelefoneCliente) {
        return this._telefoneCliente = novoTelefoneCliente;
    }
}