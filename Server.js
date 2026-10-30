const express = require("express");
const cors = require("cors")

const ErrorResponse = require("./api/utils/ErrorResponse"); 
const Logger = require("./api/utils/Logger"); 

const JwtMiddleware = require("./api/middleware/JwtMiddleware");
const ClienteMiddleware = require("./api/middleware/ClienteMiddleware");
const PedidosMiddleware = require("./api/middleware/PedidosMiddleware");
const RestauranteMiddleware = require("./api/middleware/RestauranteMiddleware");

// Roteadores
const ClienteRouter = require("./api/router/ClienteRoteador");
const PedidosRouter = require("./api/router/PedidosRoteador");
const RestauranteRouter = require("./api/router/RestauranteRoteador");

// Controllers (controladores das regras de entrada/saída HTTP)
const ClienteController = require("./api/controller/ClienteController");
const PedidosController = require("./api/controller/PedidosController");
const RestauranteController = require("./api/controller/RestaurantesController");

// Services (camada de regras de negócio)
const ClienteService = require("./api/service/ClienteService");
const PedidosService = require("./api/service/PedidosService");
const RestauranteService = require("./api/service/RestauranteService");

// DAOs (camada de acesso a dados, comunicação com o banco)
const ClienteDAO = require("./api/dao/ClienteDAO");
const PedidosDAO = require("./api/dao/PedidosDAO");
const RestauranteDAO = require("./api/dao/RestauranteDAO");

// Banco de dados (pool de conexões MySQL centralizado)
const MysqlDatabase = require("./api/database/MysqlDatabase");

module.exports = class Server {
    #porta;
    #app;
    #router;

    #database; 

    #jwtMiddleware;
    #clienteMiddleware;
    #pedidosMiddleware
    #restauranteMiddleware;

    #clienteRouter;
    #pedidosRouter;
    #restauranteRouter;

    #clienteController;
    #pedidosController;
    #restauranteController;

    #clienteService;
    #pedidosService;
    #restauranteService;

    #clienteDAO;
    #pedidosDAO;
    #restauranteDAO;

    constructor(porta) {
        console.log("⬆️ Server.constructor()");
        this.#porta = porta ?? 8080;
    }

    init = async () => {
        console.log("⬆️  Server.init()");
        this.#app = express();
        this.#router = express.Router();
        this.#app.use(express.json()); // Habilita leitura de JSON no corpo da requisição
        this.#app.use(express.static("static")); // Habilita pasta "static" para arquivos públicos (ex: HTML, JS, CSS)

        this.#app.use(cors({ origin: "*" }));

        this.#jwtMiddleware = new JwtMiddleware(); // Inicializa middleware JWT

        this.#database = MysqlDatabase.getConexao();

        this.beforeRouting(); // Middleware executado antes das rotas
        this.setupCliente();
        this.setupRestaurantes();
        this.setupPedidos();
        this.setupErrorMiddleware(); // Configura tratamento global de erros
    }

    setupCliente = () => {
        console.log("⬆️  Server.setupCliente()");

        this.#clienteMiddleware = new ClienteMiddleware();

        this.#clienteDAO = new ClienteDAO(this.#database);

        this.#clienteService = new ClienteService(this.#clienteDAO);

        this.#clienteController = new ClienteController(this.#clienteService);

        this.#clienteRouter = new ClienteRouter(
            express.Router(),
            this.#jwtMiddleware,
            this.#clienteMiddleware,
            this.#clienteController
        );

        this.#app.use("/api/v1/clientes", this.#clienteRouter.createRoutes());
    }

    setupRestaurantes = () => {
        console.log("⬆️  Server.setupRestaurante");

        this.#restauranteMiddleware = new RestauranteMiddleware();

        this.#restauranteDAO = new RestauranteDAO(this.#database);

        if (!this.#restauranteDAO) {
            this.#restauranteDAO = new RestauranteDAO(this.#database);
        }

        this.#restauranteService = new RestauranteService(this.#restauranteDAO, this.#restauranteDAO);

        this.#restauranteController = new RestauranteController(this.#restauranteService);

        this.#restauranteRouter = new RestauranteRouter(
            express.Router(),
            this.#jwtMiddleware,
            this.#restauranteMiddleware,
            this.#restauranteController
        );

        this.#app.use("/api/v1/restaurantes", this.#restauranteRouter.createRoutes());
    }

    setupPedidos = () => {
        console.log("⬆️  Server.setupPedido");

        this.#pedidosMiddleware = new PedidosMiddleware();

        this.#pedidosDAO = new PedidosDAO(this.#database);

        if (!this.#pedidosDAO) {
            this.#pedidosDAO = new PedidosDAO(this.#database);
        }

        this.#pedidosService = new PedidosService(this.#pedidosDAO, this.#pedidosDAO);

        this.#pedidosController = new PedidosController(this.#pedidosService);

        this.#pedidosRouter = new PedidosRouter(
            express.Router(),
            this.#jwtMiddleware,
            this.#pedidosMiddleware,
            this.#pedidosController
        );

        this.#app.use("/api/v1/pedidos", this.#pedidosRouter.createRoutes());
    }

    beforeRouting = () => {
        this.#app.use((req, res, next) => {
            console.log("------------------------------------------------------------------");
            next();
        });
    }

    setupErrorMiddleware = () => {
        console.log("⬆️  Server.setupErrorHandler")
        this.#app.use((error, request, response, next) => {
            if (error instanceof ErrorResponse) {
                console.log("🟡 Server.errorHandler()");
                return response.status(error.httpCode).json({
                    success: false,
                    message: error.message,
                    error: error.error
                });
            }

            const resposta = {
                success: false,
                message: "Ocorreu um erro interno no servidor",
                data: { stack: error.stack },
                error: { message: error.message || "Erro interno", code: error.code }
            };
            console.error("❌ Erro capturado:", resposta);
            Logger.log(resposta);
            response.status(500).json(resposta);
        });
    }
    
    run = () => {
        this.#app.listen(this.#porta, () => {
            console.log(`🚀 Server rodando em http://localhost:${this.#porta}/Login.html`);
        });
    }
}