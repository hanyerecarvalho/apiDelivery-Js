const Cliente = require("../model/Cliente");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class ClienteDAO {
    #database;

    constructor(databaseInstance) {
        console.log("⬆️  ClienteDAO.constructor()");
        this.#database = databaseInstance;
    }

    create = async (objClienteModel) => {
        console.log("🟢 ClienteDAO.create()");

        const SQL = "INSERT INTO clientes (nomeCliente, telefoneCliente) VALUES (?, ?);";
        const params = [objClienteModel.nomeCliente, objClienteModel.telefoneCliente];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.insertId) {
            throw new Error("Falha ao inserir cliente");
        }

        return resultado.insertId;
    };

    delete = async (objClienteModel) => {
        console.log("🟢 ClienteDAO.delete()");

        const SQL = "DELETE FROM clientes WHERE idCliente = ?;";
        const params = [objClienteModel.idCliente];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    update = async (objClienteModel) => {
        console.log("🟢 ClienteDAO.update()");

        const SQL = "UPDATE clientes SET nomeCliente, telefoneCliente = ? WHERE idCliente = ?;";
        const params = [objClienteModel.nomeCliente, objClienteModel.telefoneCliente, objClienteModel.idCliente];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        console.log("🟢 ClienteDAO.findAll()");

        const SQL = "SELECT * FROM clientes;";

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);

        return resultado;
    };

    findById = async (idCliente) => {
        console.log("🟢 ClienteDAO.findById()");

        const resultado = await this.findByField("idCliente", idCliente);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        console.log(`🟢 ClienteDAO.findByField() - Campo: ${field}, Valor: ${value}`);

        const allowedFields = ["idCliente", "nomeCliente", "telefoneCliente"];
        if (!allowedFields.includes(field)) {
            throw new Error(`Campo inválido para busca: ${field}`);
        }

        const SQL = `SELECT * FROM clientes WHERE ${field} = ?;`;
        const params = [value];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado || [];
    };
};