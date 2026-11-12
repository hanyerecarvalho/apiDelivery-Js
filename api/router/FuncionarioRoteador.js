module.exports = class FuncionarioRoteador {
    #router;
    #controller;

    constructor(routerDependency, controllerDependency) {
        this.#router = routerDependency;
        this.#controller = controllerDependency;
    }

    createRoutes = () => {
        this.#router.post("/login", this.#controller.login);
        return this.#router;
    };
};
