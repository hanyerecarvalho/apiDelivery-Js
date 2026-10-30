const Pedido = require("../model/Pedidos");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class PedidosDAO {
    #database;

    constructor(databaseInstance) {
        console.log("⬆️  PedidosDAO.constructor()");
        this.#database = databaseInstance;
    }

    create = async (objPedidoModel) => {
        console.log("🟢 PedidoDAO.create()");

        const SQL = "INSERT INTO pedidos (valorTotal, idCliente, idRestaurante) VALUES (?, ?, ?);";
        const params = [objPedidoModel.valorTotal, objPedidoModel.idCliente, objPedidoModel.idRestaurante];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.insertId) {
            throw new Error("Falha ao inserir restaurante");
        }

        return resultado.insertId;
    };

    delete = async (objPedidoModel) => {
        console.log("🟢 PedidoDAO.delete()");

        const SQL = "DELETE FROM pedidos WHERE idPedido = ?;";
        const params = [objPedidoModel.idPedido];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    update = async (objPedidoModel) => {
        console.log("🟢 PedidoDAO.update()");

        const SQL = "UPDATE pedidos SET valorTotal, idCliente, idRestaurante = ? WHERE idPedido = ?;";
        const params = [objPedidoModel.valorTotal, objPedidoModel.idCliente, objPedidoModel.idRestaurante];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        console.log("🟢 PedidoDAO.findAll()");

        const SQL = "SELECT * FROM pedidos;";

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);

        return resultado;
    };

    findById = async (idPedido) => {
        console.log("🟢 PedidoDAO.findById()");

        const resultado = await this.findByField("idPedido", idPedido);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        console.log(`🟢 PedidoDAO.findByField() - Campo: ${field}, Valor: ${value}`);

        const allowedFields = ["idPedido", "valorTotal", "idCliente", "idRestaurante"];
        if (!allowedFields.includes(field)) {
            throw new Error(`Campo inválido para busca: ${field}`);
        }

        const SQL = `SELECT * FROM pedidos WHERE ${field} = ?;`;
        const params = [value];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado || [];
    };
};