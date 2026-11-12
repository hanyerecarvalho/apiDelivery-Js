const MeuTokenJWT = require("../http/MeuTokenJWT");
const { validarSenha } = require("../http/Senha");

module.exports = class FuncionarioService {
    #funcionarioDAO;

    constructor(funcionarioDAODependency) {
        this.#funcionarioDAO = funcionarioDAODependency;
    }

    login = async (email, senha) => {
        const funcionario = await this.#funcionarioDAO.findByEmail(email);
        if (!funcionario || !(await validarSenha(senha, funcionario.senhaHash))) return null;

        return new MeuTokenJWT().gerarToken({
            idFuncionario: funcionario.idFuncionario,
            email: funcionario.email,
            name: funcionario.nome,
            role: "funcionario"
        });
    };
};
