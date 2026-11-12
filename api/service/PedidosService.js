const PedidosDAO = require("../dao/PedidosDAO");
const Pedido = require("../model/Pedidos");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class PedidoService {
    #pedidoDAO;

    constructor(pedidoDAODependency) {
        console.log("⬆️  PedidoService.constructor()");
        this.#pedidoDAO = pedidoDAODependency; 
    }

    createPedido = async (pedidoJson) => {
        console.log("🟣 PedidoService.createPedido()");

        const pedido = new Pedido();
       
        pedido.valorTotal = pedidoJson.valorTotal;
        pedido.idCliente = pedidoJson.idCliente;
        pedido.idRestaurante = pedidoJson.idRestaurante;

        return this.#pedidoDAO.create(pedido);
    }

    findAll = async () => {
        console.log("🟣 PedidoService.findAll()");
        return this.#pedidoDAO.findAll();
    }

    findById = async (idPedido) => {
        console.log("🟣 PedidoService.findById()");
        const pedido = new Pedido();
    
        pedido.idPedido = idPedido;

        return this.#pedidoDAO.findById(pedido.idPedido);
    }

    updatePedido = async (pedidoJson) => {
        console.log("🟣 PedidoService.updatePedido()");
       
        const pedido = new Pedido();
        pedido.idPedido = pedidoJson.idPedido;
        pedido.valorTotal = pedidoJson.valorTotal;
        pedido.idCliente = pedidoJson.idCliente;
        pedido.idRestaurante = pedidoJson.idRestaurante;

        return this.#pedidoDAO.update(pedido);
    }


    deletePedido = async (idPedido) => {
        console.log("🟣 PedidoService.deletePedido()");


        const pedido = new Pedido();
        pedido.idPedido = idPedido;

        return this.#pedidoDAO.delete(pedido);
    }
}