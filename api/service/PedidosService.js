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
       
        pedido.setValorTotal(pedidoJson.valorTotal);
        pedido.setIdCliente(pedidoJson.idCliente);
        pedido.setIdRestaurante(pedidoJson.idRestaurante);

        return this.#pedidoDAO.create(pedido);
    }

    findAll = async () => {
        console.log("🟣 PedidoService.findAll()");
        return this.#pedidoDAO.findAll();
    }

    findById = async (idPedido) => {
        console.log("🟣 PedidoService.findById()");
        const pedido = new Pedido();
    
        pedido.setIdPedido(idPedido);

        return this.#pedidoDAO.findById(pedido.getIdPedido());
    }

    updatePedido = async (pedidoJson) => {
        console.log("🟣 PedidoService.updatePedido()");
       
        const pedido = new Pedido();
        pedido.setIdPedido(pedidoJson.idPedido);
        pedido.setValorTotal(pedidoJson.valorTotal);
        pedido.setIdCliente(pedidoJson.idCliente);
        pedido.setIdRestaurante(pedidoJson.idRestaurante);

        return this.#pedidoDAO.update(pedido);
    }


    deletePedido = async (idPedido) => {
        console.log("🟣 PedidoService.deletePedido()");


        const pedido = new Pedido();
        pedido.setIdPedido(idPedido); 

        return this.#pedidoDAO.delete(pedido);
    }
}