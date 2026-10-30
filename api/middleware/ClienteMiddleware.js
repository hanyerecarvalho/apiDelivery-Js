const ErrorResponse = require("../utils/ErrorResponse");
const Cliente = require("../model/Cliente");
const ClienteDAO = require("../dao/ClienteDAO");

module.exports = class ClienteMiddleware {

    validateBody = (request, response, next) => {
        console.log("🔷 ClienteMiddleware.validateBody()");
        const body = request.body;

        if (!body.cliente) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'cliente' é obrigatório!" });
        }

        const cliente = body.cliente;

        if (!cliente.nomeCliente || cliente.nomeCliente.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'nomeCliente' é obrigatório!" });
        }
        if (!cliente.telefoneCliente || cliente.telefoneCliente.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'telefoneCliente' é obrigatório!" });
        }

        next(); 
    }

    validateIdParam = (request, response, next) => {
        console.log("🔷 ClienteMiddleware.validateIdParam()");
        const { idCliente } = request.params;

        if (!idCliente) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idCliente' é obrigatório!" });
        }

        next();
    }
}