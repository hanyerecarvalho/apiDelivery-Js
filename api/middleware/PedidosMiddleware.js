const ErrorResponse = require("../utils/ErrorResponse");
const Pedido = require("../model/Pedidos");
const PedidoDAO = require("../dao/PedidosDAO");

module.exports = class PedidoMiddleware {

    validateBody = (request, response, next) => {
        console.log("🔷 PedidoMiddleware.validateBody()");
        const body = request.body;

        if (!body.pedido) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'pedido' é obrigatório!" });
        }

        const pedido = body.pedido;

        if (typeof pedido.valorTotal !== "number" || !Number.isFinite(pedido.valorTotal) || pedido.valorTotal <= 0) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'valorTotal' é obrigatório!" });
        }
        if (!Number.isInteger(pedido.idCliente) || pedido.idCliente <= 0) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idCliente' é obrigatório!" });
        }
        if (!Number.isInteger(pedido.idRestaurante) || pedido.idRestaurante <= 0) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idRestaurante' é obrigatório!" });
        }

        next(); 
    }

    validateIdParam = (request, response, next) => {
        console.log("🔷 PedidoMiddleware.validateIdParam()");
        const { idPedido } = request.params;

        if (!idPedido) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idPedido' é obrigatório!" });
        }

        next();
    }
}