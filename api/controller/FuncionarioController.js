module.exports = class FuncionarioController {
    #funcionarioService;

    constructor(funcionarioServiceDependency) {
        this.#funcionarioService = funcionarioServiceDependency;
    }

    login = async (request, response) => {
        const { email, senha } = request.body?.funcionario ?? request.body ?? {};
        if (typeof email !== "string" || !email.trim() || email.length > 254 ||
            typeof senha !== "string" || !senha || senha.length > 1024) {
            return response.status(400).json({ success: false, message: "Informe e-mail e senha." });
        }

        const token = await this.#funcionarioService.login(email.trim().toLowerCase(), senha);
        if (!token) {
            return response.status(401).json({ success: false, message: "E-mail ou senha incorretos." });
        }
        return response.set("Cache-Control", "no-store").json({ success: true, data: { token } });
    };
};
