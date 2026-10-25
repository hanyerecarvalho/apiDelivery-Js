module.exports = class Pedidos {
    constructor() {
        this._idPedido = null;
        this._valorTotal = null;
        this._idCliente = null;
        this._idRestaurante = null;
    }

    getIdPedido() {
        return this._idPedido;
    }

    setIdPedido(novoIdPedido) {

        const parsed = Number(novoIdPedido);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idPedido deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idPedido tem que ser maior que 0");
        }
        return this._idPedido = parsed;
    }

    getValorTotal() {
        return this._valorTotal;
    }
    
    setValorTotal(novoValorTotal) {
        if (typeof novoValorTotal !== "number") {
            throw new Error("valorTotal deve ser um numero");
        }
        if (novoValorTotal <= 0) {
            throw new Error("valorTotal deve ser maior que 0");
        }

        return this._valorTotal = valor;
    }

    getIdCliente() {
        return this._idCliente;
    }

    setIdCliente(novoIdCliente) {
        if (typeof novoIdCliente !== "number") {
            throw new Error("idCliente deve ser um número");
        }
        if (novoIdCliente <= 0) {
            throw new Error("id deve ser maior que 0");
        }

        this._idCliente = novoIdCliente;
    }

    getIdRestaurante() {
        return this._idRestaurante;
    }

    setIdRestaurante(novoIdRestaurante) {
        if (typeof novoIdRestaurante !== "number") {
            throw new Error("idRestaurante deve ser um numero");
        }
        if (novoIdRestaurante <= 0) {
            throw new Error("idRestaurante deve ser maior que 0");
        }

        this._idRestaurante = novoIdRestaurante
    }
}