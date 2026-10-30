const ErrorResponse = require("../utils/ErrorResponse");
const Restaurante = require("../model/Restaurante");
const RestauranteDAO = require("../dao/RestauranteDAO");

module.exports = class PedidoMiddleware {

    validateBody = (request, response, next) => {
        console.log("🔷 RestauranteMiddleware.validateBody()");
        const body = request.body;

        if (!body.restaurante) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'restaurante' é obrigatório!" });
        }

        const restaurante = body.restaurante;

        if (!restaurante.nomeRestaurante === "" || restaurante.nomeRestaurante.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'nomeRestaurante' é obrigatório!" });
        }
        if (!restaurante.telefoneRestaurante === "" || restaurante.telefoneRestaurante.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'telefoneRestaurante' é obrigatório!" });
        }
        if (!restaurante.enderecoRestaurante === "" || restaurante.enderecoRestaurante.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'enderecoRestaurante' é obrigatório!" });
        }

        next(); 
    }

    validateIdParam = (request, response, next) => {
        console.log("🔷 RestauranteMiddleware.validateIdParam()");
        const { idRestaurante } = request.params;

        if (!idRestaurante) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'idRestaurante' é obrigatório!" });
        }

        next();
    }
}