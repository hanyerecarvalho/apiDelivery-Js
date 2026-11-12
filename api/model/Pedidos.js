module.exports = class Pedidos {
        #idPedido;
        #valorTotal;
        #idCliente;
        #idRestaurante;

    constructor() {
        console.log("⬆️  Pedido.constructor()");
    }

    get idPedido() {
        return this.#idPedido;
    }

    set idPedido(novoIdPedido) {

        const parsed = Number(novoIdPedido);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idPedido deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idPedido tem que ser maior que 0");
        }
        return this.#idPedido = parsed;
    }

    get valorTotal() {
        return this.#valorTotal;
    }
    
    set valorTotal(novoValorTotal) {
        if (typeof novoValorTotal !== "number") {
            throw new Error("valorTotal deve ser um numero");
        }
        if (novoValorTotal <= 0) {
            throw new Error("valorTotal deve ser maior que 0");
        }

        return this.#valorTotal = novoValorTotal;
    }

    get idCliente() {
        return this.#idCliente;
    }

    set idCliente(novoIdCliente) {
        if (typeof novoIdCliente !== "number") {
            throw new Error("idCliente deve ser um número");
        }
        if (novoIdCliente <= 0) {
            throw new Error("id deve ser maior que 0");
        }

        this.#idCliente = novoIdCliente;
    }

    get idRestaurante() {
        return this.#idRestaurante;
    }

    set idRestaurante(novoIdRestaurante) {
        if (typeof novoIdRestaurante !== "number") {
            throw new Error("idRestaurante deve ser um numero");
        }
        if (novoIdRestaurante <= 0) {
            throw new Error("idRestaurante deve ser maior que 0");
        }

        this.#idRestaurante = novoIdRestaurante
    }
}