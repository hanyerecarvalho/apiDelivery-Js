const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const RestauranteMiddleware = require("../middleware/RestauranteMiddleware");
const RestauranteController = require("../controller/RestaurantesController");

module.exports = class RestauranteRoteador {
    #router;
    #restauranteMiddleware;
    #restauranteControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, restauranteMiddlewareDependency, restauranteControllerDependency) {
        console.log("⬆️  RestauranteRoteador.constructor()");

        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#restauranteMiddleware = restauranteMiddlewareDependency;
        this.#restauranteControl = restauranteControllerDependency;
    }

    createRoutes = () => {
        console.log("⬆️  RestauranteRoteador.createRoutes()");

        this.#router.post("/",
            this.#jwtMiddleware.validateToken,
            this.#restauranteMiddleware.validateBody,
            this.#restauranteControl.store
        );

        this.#router.get("/",
            this.#jwtMiddleware.validateToken,
            this.#restauranteControl.index
        );

        this.#router.get("/:idRestaurante",
            this.#jwtMiddleware.validateToken,
            this.#restauranteMiddleware.validateIdParam,
            this.#restauranteControl.show
        );

        this.#router.put("/:idRestaurante",
            this.#jwtMiddleware.validateToken,
            this.#restauranteMiddleware.validateIdParam,
            this.#restauranteMiddleware.validateBody,
            this.#restauranteControl.update
        );

        this.#router.delete("/:idRestaurante",
            this.#jwtMiddleware.validateToken,
            this.#restauranteMiddleware.validateIdParam,
            this.#restauranteControl.destroy
        );

        return this.#router;
    }

}