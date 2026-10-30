const PedidosService = require("../service/PedidosService");

module.exports = class PedidosControl {
    #pedidoService

    constructor(pedidoServiceDependency) {
        console.log("⬆️  PedidosControl.constructor()");
        this.#pedidoService = pedidoServiceDependency;
    }

    store = async (request, response, next) => {
        console.log("🔵 PedidosControle.store()");
        try {
            const pedidoBodyRequest = request.body.pedido;

            const novoId = await this.#pedidoService.createCargo(pedidoBodyRequest);

            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    pedidos: [{
                        idPedido: novoId,
                        nomeCargo: pedidoBodyRequest.nomePedido,
                        telefonePedido: pedidoBodyRequest.telefonePedido
                    }]
                }
            };
            if (novoId) {
                response.status(201).send(objResposta);
            } else {
                throw new Error("Falha ao cadastrar novo pedido");
            }
        } catch (error) {
            next(error); 
        }
    }

    index = async (request, response, next) => {
        console.log("🔵 PedidoControle.index()");
        try {
            const arrayPedidos = await this.#pedidoService.findAll();

            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    pedidos: arrayPedidos
                },
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        console.log("🔵 PedidoControle.show()");
        try {
            const pedidoId = request.params.idPedido;
            const pedido = await this.#pedidoService.findById(pedidoId);

            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    pedidos: pedido
                }
            }

            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        console.log("🔵 PedidoControle.update()");
        try {
            const pedidoId = request.params.idPedido;
            const valorTotal = request.body.pedido.valorTotal;
            const idCliente = request.body.pedido.idCliente;
            const idRestaurante = request.body.pedido.idRestaurante;
            const atualizou = await this.#pedidoService.updatePedido(pedidoId, valorTotal, idCliente, idRestaurante);

            if (atualizou) {
                return response.status(200).send({
                    success: true,
                    message: 'Atualizado com sucesso',
                    data: {
                        pedidos: [{
                            idPedido: pedidoId,
                            valorTotal: valorTotal,
                            idCliente: idCliente,
                            idRestaurante: idRestaurante
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Pedido não encontrado para atualização',
                    data: {
                        pedidos: [{
                            idPedido: pedidoId,
                            valorTotal: valorTotal,
                            idCliente: idCliente,
                            idRestaurante: idRestaurante
                        }]
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }

    destroy = async (request, response, next) => {
        console.log("🔵 PedidoControle.destroy()");
        try {
            const pedidoId = request.params.idPedido;
            const excluiu = this.#pedidoService.deletePedido(pedidoId);

            if (excluiu) {
                return response.status(204).send({
                    success: true,
                    message: 'Excluido com sucesso com sucesso',
                    data: {
                        pedidos: [{
                            idPedido: pedidoId
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Pedido não encontrado para exclusão',
                    data: {
                        pedidos: [{
                            idPedido: pedidoId,
                        }]
                    }
                })
            }

        } catch (error) {
            next(error);
        }
    }
}