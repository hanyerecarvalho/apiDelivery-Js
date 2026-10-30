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

        if (!pedido.valorTotal === "" ||  pedido.valorTotal === null || pedido.valorTotal === undefined) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'valorTotal' é obrigatório!" });
        }
        if (!idCliente) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idCliente' é obrigatório!" });
        }
        if (!idRestaurante) {
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