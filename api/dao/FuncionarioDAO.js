const Funcionario = require("../model/Funcionario");

module.exports = class FuncionarioDAO {
    #database;

    constructor(databaseDependency) {
        this.#database = databaseDependency;
    }

    findByEmail = async (email) => {
        const sql = "SELECT idFuncionario, nome, email, senha_hash FROM contas_acesso WHERE email = ? LIMIT 1";
        const [rows] = await this.#database.execute(sql, [email]);
        return rows[0] ? new Funcionario(rows[0]) : null;
    };

    create = async (nome, email, senhaHash) => {
        const [resultado] = await this.#database.execute(
            "INSERT INTO contas_acesso (nome, email, senha_hash) VALUES (?, ?, ?)",
            [nome, email, senhaHash]
        );
        return resultado.insertId;
    };
};
