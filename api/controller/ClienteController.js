const ClienteService = require("../service/ClienteService");


module.exports = class ClienteControl {
    #clienteService

    constructor(clienteServiceDependency) {
        console.log("⬆️  ClienteControl.constructor()");
        this.#clienteService = clienteServiceDependency;
    }

    store = async (request, response, next) => {
        console.log("🔵 ClienteControle.store()");
        try {
            const clienteBodyRequest = request.body.cliente;

            const novoId = await this.#clienteService.createCargo(clienteBodyRequest);

            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    cargos: [{
                        idCliente: novoId,
                        nomeCargo: clienteBodyRequest.nomeCliente,
                        telefoneCliente: clienteBodyRequest.telefoneCliente
                    }]
                }
            };
            if (novoId) {
                response.status(201).send(objResposta);
            } else {
                throw new Error("Falha ao cadastrar novo cliente");
            }
        } catch (error) {
            next(error); 
        }
    }

    index = async (request, response, next) => {
        console.log("🔵 ClienteControle.index()");
        try {
            const arrayClientes = await this.#clienteService.findAll();

            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    clientes: arrayClientes
                },
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        console.log("🔵 ClienteControle.show()");
        try {
            const clienteId = request.params.idCliente;
            const cliente = await this.#clienteService.findById(clienteId);

            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    clientes: cliente
                }
            }

            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        console.log("🔵 ClienteControle.update()");
        try {
            const clienteId = request.params.idCliente;
            const nomeCliente = request.body.cliente.nomeCliente;
            const telefoneCliente = request.body.cliente.telefoneCliente;
            const atualizou = await this.#clienteService.updateCliente(clienteId, nomeCliente, telefoneCliente);

            if (atualizou) {
                return response.status(200).send({
                    success: true,
                    message: 'Atualizado com sucesso',
                    data: {
                        clientes: [{
                            idCliente: clienteId,
                            nomeCliente: nomeCliente,
                            telefoneCliente: telefoneCliente
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Cliente não encontrado para atualização',
                    data: {
                        clientes: [{
                            idCliente: clienteId,
                            nomeCliente: nomeCliente,
                            telefoneCliente: telefoneCliente
                        }]
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }

    destroy = async (request, response, next) => {
        console.log("🔵 ClienteControle.destroy()");
        try {
            const clienteId = request.params.idCliente;
            const excluiu = this.#clienteService.deleteCliente(clienteId);

            if (excluiu) {
                return response.status(204).send({
                    success: true,
                    message: 'Excluido com sucesso com sucesso',
                    data: {
                        clientes: [{
                            idCliente: clienteId
                        }]
                    }
                })
            } else {
                return response.status(404).send({
                    success: false,
                    message: 'Cliente não encontrado para exclusão',
                    data: {
                        clientes: [{
                            idCliente: clienteId,
                        }]
                    }
                })
            }

        } catch (error) {
            next(error);
        }
    }
}