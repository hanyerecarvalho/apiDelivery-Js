const RestauranteDAO = require("../dao/RestauranteDAO");
const Restaurante = require("../model/Restaurante");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class RestauranteService {
    #restauranteDAO;

    constructor(restauranteDAODependency) {
        console.log("⬆️  RestauranteService.constructor()");
        this.#restauranteDAO = restauranteDAODependency; 
    }

    createRestaurante = async (restauranteJson) => {
        console.log("🟣 RestauranteService.createRestaurante()");

        const restaurante = new Restaurante();
       
        restaurante.nomeRestaurante = restauranteJson.nomeRestaurante;
        restaurante.telefoneRestaurante = restauranteJson.telefoneRestaurante;
        restaurante.enderecoRestaurante = restauranteJson.enderecoRestaurante;

        return this.#restauranteDAO.create(restaurante);
    }

    findAll = async () => {
        console.log("🟣 restauranteService.findAll()");
        return this.#restauranteDAO.findAll();
    }

    findById = async (idRestaurante) => {
        console.log("🟣 RestauranteService.findById()");
        const restaurante = new Restaurante();
        

        restaurante.idRestaurante = idRestaurante;
        return this.#restauranteDAO.findById(restaurante.idRestaurante);
    }

    updateRestaurante = async (restauranteJson) => {
        console.log("🟣 RestauranteService.updateRestaurante()");
       
        const restaurante = new Restaurante();
        restaurante.idRestaurante = restauranteJson.idRestaurante;
        restaurante.nomeRestaurante = restauranteJson.nomeRestaurante;
        restaurante.telefoneRestaurante = restauranteJson.telefoneRestaurante;
        restaurante.enderecoRestaurante = restauranteJson.enderecoRestaurante;

        return this.#restauranteDAO.update(restaurante);
    }


    deleteRestaurante = async (idRestaurante) => {
        console.log("🟣 RestauranteService.deleteRestaurante()");


        const restaurante = new Restaurante();
        restaurante.idRestaurante = idRestaurante    

        return this.#restauranteDAO.delete(restaurante);
    }
}
