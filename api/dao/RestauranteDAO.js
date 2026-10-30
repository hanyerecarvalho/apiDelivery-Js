const Restaurante = require("../model/Restaurante");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class RestauranteDAO {
    #database;

    constructor(databaseInstance) {
        console.log("⬆️  RestauranteDAO.constructor()");
        this.#database = databaseInstance;
    }

    create = async (objRestauranteModel) => {
        console.log("🟢 RestauranteDAO.create()");

        const SQL = "INSERT INTO restaurantes (nomeRestaurante, telefoneRestaurante, enderecoRestaurante) VALUES (?, ?, ?);";
        const params = [objRestauranteModel.nomeRestaurante, objRestauranteModel.telefoneRestaurante, objRestauranteModel.enderecoRestaurante];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.insertId) {
            throw new Error("Falha ao inserir restaurante");
        }

        return resultado.insertId;
    };

    delete = async (objRestauranteModel) => {
        console.log("🟢 RestauranteDAO.delete()");

        const SQL = "DELETE FROM restaurantes WHERE idRestaurante = ?;";
        const params = [objRestauranteModel.idRestaurante];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    update = async (objRestauranteModel) => {
        console.log("🟢 RestauranteDAO.update()");

        const SQL = "UPDATE restaurantes SET nomeRestaurante, telefoneRestaurante, enderecoRestaurante = ? WHERE idRestaurante = ?;";
        const params = [objRestauranteModel.nomeRestaurante, objRestauranteModel.telefoneRestaurante, objRestauranteModel.enderecoRestaurante, objRestauranteModel.idRestaurante];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        console.log("🟢 RestauranteDAO.findAll()");

        const SQL = "SELECT * FROM restaurantes;";

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);

        return resultado;
    };

    findById = async (idRestaurante) => {
        console.log("🟢 RestauranteDAO.findById()");

        const resultado = await this.findByField("idRestaurante", idRestaurante);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        console.log(`🟢 RestauranteDAO.findByField() - Campo: ${field}, Valor: ${value}`);

        const allowedFields = ["idRestaurante", "nomeRestaurante", "telefoneRestaurante", "enderecoRestaurante"];
        if (!allowedFields.includes(field)) {
            throw new Error(`Campo inválido para busca: ${field}`);
        }

        const SQL = `SELECT * FROM restaurantes WHERE ${field} = ?;`;
        const params = [value];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado || [];
    };
};