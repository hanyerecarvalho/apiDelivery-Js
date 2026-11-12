module.exports = class Funcionario {
    #idFuncionario;
    #nome;
    #email;
    #senhaHash;

    constructor({ idFuncionario, nome, email, senha_hash }) {
        this.#idFuncionario = idFuncionario;
        this.#nome = nome;
        this.#email = email;
        this.#senhaHash = senha_hash;
    }

    get idFuncionario() { return this.#idFuncionario; }
    get nome() { return this.#nome; }
    get email() { return this.#email; }
    get senhaHash() { return this.#senhaHash; }
};
