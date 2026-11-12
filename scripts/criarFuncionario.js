const Banco = require("../api/database/MysqlDatabase");
const FuncionarioDAO = require("../api/dao/FuncionarioDAO");
const { gerarHash } = require("../api/http/Senha");

async function main() {
    const nome = process.env.FUNCIONARIO_NOME?.trim();
    const email = process.env.FUNCIONARIO_EMAIL?.trim().toLowerCase();
    const senha = process.env.FUNCIONARIO_SENHA;
    if (!nome || nome.length > 100 || !email || email.length > 254 || !email.includes("@") ||
        !senha || senha.length < 12 || senha.length > 1024) {
        throw new Error("Defina FUNCIONARIO_NOME, FUNCIONARIO_EMAIL e FUNCIONARIO_SENHA (mínimo de 12 caracteres).");
    }
    const banco = Banco.getConexao().promise();
    try {
        const id = await new FuncionarioDAO(banco).create(nome, email, await gerarHash(senha));
        console.log("Funcionário cadastrado. ID:", id);
    } finally {
        await banco.end();
    }
}

main().catch((erro) => {
    console.error("Falha ao cadastrar:", erro.code || erro.message);
    process.exitCode = 1;
});
