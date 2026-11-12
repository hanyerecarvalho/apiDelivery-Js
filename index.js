const Server = require('./Server');
const MeuTokenJWT = require('./api/http/MeuTokenJWT');

(async () => {
    try {
        new MeuTokenJWT();
        const server = new Server(8080);

        await server.init();

        server.run();

        console.log("✅ Servidor iniciado com sucesso");
    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
    }
})();