import pino from "pino";

const logger = pino({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  level: process.env.LOG_LEVEL || "info",
});

export default logger;
