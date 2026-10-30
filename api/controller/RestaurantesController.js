const RestaurantesService = require("../service/RestauranteService");


module.exports = class RestauranteControl {
    #restauranteService

    constructor(restauranteServiceDependency) {
        console.log("⬆️  RestauranteControl.constructor()");
        this.#restauranteService = restauranteServiceDependency;
    }

    store = async (request, response, next) => {
        console.log("🔵 RestauranteControle.store()");
        try {
            const restauranteBodyRequest = request.body.restaurante;

            const novoId = await this.#restauranteService.createRestaurante(restauranteBodyRequest);

            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    restaurantes: [{
                        idRestaurante: novoId,
                        nomeRestaurante: restauranteBodyRequest.nomeRestaurante,
                        telefoneRestaurante: restauranteBodyRequest.telefoneRestaurante,
                        enderecoRestaurante: restauranteBodyRequest.enderecoRestaurante
                    }]
                }
            };
            if (novoId) {
                response.status(201).send(objResposta);
            } else {
                throw new Error("Falha ao cadastrar novo restaurante");
            }
        } catch (error) {
            next(error); 
        }
    }

    index = async (request, response, next) => {
        console.log("🔵 RestauranteControle.index()");
        try {
            const arrayRestaurantes = await this.#restauranteService.findAll();

            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    restaurantes: arrayRestaurantes
                },
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        console.log("🔵 RestauranteControle.show()");
        try {
            const restauranteId = request.params.idRestaurante;
            const restaurante = await this.#restauranteService.findById(restauranteId);

            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    restaurantes: restaurante
                }
            }

            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        console.log("🔵 RestauranteControle.update()");
        try {
            const restauranteId = request.params.idRestaurante;
            const nomeRestaurante = request.body.restaurante.nomeRestaurante;
            const telefoneRestaurante = request.body.restaurante.telefoneRestaurante;
            const enderecoRestaurante = request.body.restaurante.enderecoRestaurante;
            const atualizou = await this.#restauranteService.updateRestaurante(restauranteId, nomeRestaurante, telefoneRestaurante, enderecoRestaurante);

            if (atualizou) {
                return response.status(200).send({
                    success: true,
                    message: 'Atualizado com sucesso',
                    data: {
                        restaurantes: [{
                            idRestaurante: restauranteId,
                            nomeRestaurante: nomeRestaurante,
                            enderecoRestaurante: telefoneRestaurante,
                            telefoneRestaurante: enderecoRestaurante
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Restaurante não encontrado para atualização',
                    data: {
                        restaurantes: [{
                            idRestaurante: restauranteId,
                            nomeRestaurante: nomeRestaurante,
                            telefoneRestaurante: telefoneRestaurante,
                            enderecoRestaurante: enderecoRestaurante
                        }]
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }

    destroy = async (request, response, next) => {
        console.log("🔵 RestauranteControle.destroy()");
        try {
            const restauranteId = request.params.idPedido;
            const excluiu = this.#restauranteService.deleteRestaurante(restauranteId);

            if (excluiu) {
                return response.status(204).send({
                    success: true,
                    message: 'Excluido com sucesso com sucesso',
                    data: {
                        pedidos: [{
                            idRestaurante: restauranteId
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Restaurante não encontrado para exclusão',
                    data: {
                        restaurantes: [{
                            idRestaurante: restauranteId,
                        }]
                    }
                })
            }

        } catch (error) {
            next(error);
        }
    }
}