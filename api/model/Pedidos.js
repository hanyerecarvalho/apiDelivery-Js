module.exports = class Pedidos {
        #idPedido;
        #valorTotal;
        #idCliente;
        #idRestaurante;

    constructor() {
        console.log("⬆️  Pedido.constructor()");
    }

    getIdPedido() {
        return this.#idPedido;
    }

    setIdPedido(novoIdPedido) {

        const parsed = Number(novoIdPedido);

        if (!Number.isInteger(parsed)) { 
            throw new Error("idPedido deve ser um número inteiro.");
        }

        if (parsed <= 0) {
            throw new Error("idPedido tem que ser maior que 0");
        }
        return this.#idPedido = parsed;
    }

    getValorTotal() {
        return this.#valorTotal;
    }
    
    setValorTotal(novoValorTotal) {
        if (typeof novoValorTotal !== "number") {
            throw new Error("valorTotal deve ser um numero");
        }
        if (novoValorTotal <= 0) {
            throw new Error("valorTotal deve ser maior que 0");
        }

        return this.#valorTotal = valor;
    }

    getIdCliente() {
        return this.#idCliente;
    }

    setIdCliente(novoIdCliente) {
        if (typeof novoIdCliente !== "number") {
            throw new Error("idCliente deve ser um número");
        }
        if (novoIdCliente <= 0) {
            throw new Error("id deve ser maior que 0");
        }

        this.#idCliente = novoIdCliente;
    }

    getIdRestaurante() {
        return this.#idRestaurante;
    }

    setIdRestaurante(novoIdRestaurante) {
        if (typeof novoIdRestaurante !== "number") {
            throw new Error("idRestaurante deve ser um numero");
        }
        if (novoIdRestaurante <= 0) {
            throw new Error("idRestaurante deve ser maior que 0");
        }

        this.#idRestaurante = novoIdRestaurante
    }
}