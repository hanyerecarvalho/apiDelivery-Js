const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const PedidoMiddleware = require("../middleware/PedidosMiddleware");
const PedidoController = require("../controller/PedidosController");

module.exports = class ClienteRoteador {
    #router;
    #pedidoMiddleware;
    #pedidoControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, pedidoMiddlewareDependency, pedidoControllerDependency) {
        console.log("⬆️  PedidoRoteador.constructor()");

        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#pedidoMiddleware = pedidoMiddlewareDependency;
        this.#pedidoControl = pedidoControllerDependency;
    }

    createRoutes = () => {
        console.log("⬆️  PedidoRoteador.createRoutes()");

        this.#router.post("/",
            this.#jwtMiddleware.validateToken,
            this.#pedidoMiddleware.validateBody,
            this.#pedidoControl.store
        );

        this.#router.get("/",
            this.#jwtMiddleware.validateToken,
            this.#pedidoControl.index
        );

        this.#router.get("/:idPedido",
            this.#jwtMiddleware.validateToken,
            this.#pedidoMiddleware.validateIdParam,
            this.#pedidoControl.show
        );

        this.#router.put("/:idPedido",
            this.#jwtMiddleware.validateToken,
            this.#pedidoMiddleware.validateIdParam,
            this.#pedidoMiddleware.validateBody,
            this.#pedidoControl.update
        );

        this.#router.delete("/:idPedido",
            this.#jwtMiddleware.validateToken,
            this.#pedidoMiddleware.validateIdParam,
            this.#pedidoControl.destroy
        );

        return this.#router;
    }

}