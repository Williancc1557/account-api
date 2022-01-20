import pino from "pino";

const pinoConfig = pino({
    level: "debug",
    prettyPrint: true,
});

export { pinoConfig };