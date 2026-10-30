const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const ClienteMiddleware = require("../middleware/ClienteMiddleware");
const ClienteController = require("../controller/ClienteController");

module.exports = class ClienteRoteador {
    #router;
    #clienteMiddleware;
    #clienteControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, clienteMiddlewareDependency, clienteControllerDependency) {
        console.log("⬆️  CargoRoteador.constructor()");

        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#clienteMiddleware = clienteMiddlewareDependency;
        this.#clienteControl = clienteControllerDependency;
    }

    createRoutes = () => {
        console.log("⬆️  ClienteRoteador.createRoutes()");

        this.#router.post("/",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateBody,
            this.#clienteControl.store
        );

        this.#router.get("/",
            this.#jwtMiddleware.validateToken,
            this.#clienteControl.index
        );

        this.#router.get("/:idCliente",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateIdParam,
            this.#clienteControl.show
        );

        this.#router.put("/:idCliente",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateIdParam,
            this.#clienteMiddleware.validateBody,
            this.#clienteControl.update
        );

        this.#router.delete("/:idCliente",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateIdParam,
            this.#clienteControl.destroy
        );

        return this.#router;
    }

}