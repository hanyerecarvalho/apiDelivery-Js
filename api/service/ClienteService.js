const ClienteDAO = require("../dao/ClienteDAO");
const Cliente = require("../models/Cliente");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class ClienteService {
    #clienteDAO;

    constructor(clienteDAODependency) {
        console.log("⬆️  ClienteService.constructor()");
        this.#clienteDAO = clienteDAODependency; 
    }


    createCliente = async (clienteJson) => {
        console.log("🟣 ClienteService.createCliente()");

        const cliente = new Cliente();
       
        cliente.nomeCliente = clienteJson.nomeCliente;

        const resultado = await this.#clienteDAO.findByField("nomeCliente", cliente.nomeCliente);

        if (resultado.length > 0) {
            throw new ErrorResponse(
                400, 
                "Cliente já existe",
                { message: `O cliente ${cliente.nomeCliente} já existe` }
            );
        }

        return this.#clienteDAO.create(cliente);
    }

    findAll = async () => {
        console.log("🟣 ClienteService.findAll()");
        return this.#clienteDAO.findAll();
    }

    findById = async (idCliente) => {
        console.log("🟣 ClienteService.findById()");
        const cliente = new Cliente();
        
        cliente.idCliente = idCliente;
      
        return this.#clienteDAO.findById(cliente.idCliente);
    }

    updateCliente = async (idCliente, nomeCliente) => {
        console.log("🟣 ClienteService.updateCliente()");
       
        const cliente = new Cliente();

        cliente.idCliente = idCliente;
        cliente.nomeCliente = nomeCliente;

        return this.#clienteDAO.update(cliente);
    }

    deleteCliente = async (idCliente) => {
        console.log("🟣 ClienteService.deleteCliente()");


        const cliente = new Cliente();
        cliente.idCliente = idCliente;    

        return this.#clienteDAO.delete(cliente);
    }
}