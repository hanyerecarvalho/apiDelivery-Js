const { randomBytes, scrypt, timingSafeEqual } = require("node:crypto");
const { promisify } = require("node:util");
const derivar = promisify(scrypt);

exports.gerarHash = async (senha) => {
    const salt = randomBytes(16).toString("hex");
    const hash = await derivar(senha, salt, 64);
    return salt + ":" + hash.toString("hex");
};

exports.validarSenha = async (senha, registro) => {
    if (!/^[0-9a-f]{32}:[0-9a-f]{128}$/.test(registro)) return false;
    const [salt, hash] = registro.split(":");
    const obtido = await derivar(senha, salt, 64);
    return timingSafeEqual(obtido, Buffer.from(hash, "hex"));
};
