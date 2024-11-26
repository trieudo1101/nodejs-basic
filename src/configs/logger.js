import winston from "winston";
import { format, transports } from "winston";
import path from "path";

const logDir = path.resolve("./src/logs");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, meta, stack }) => {
  let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (meta) {
    log += ` - Meta: ${JSON.stringify(meta)}`;
  }
  if (stack) {
    log += ` - Stack: ${stack}`;
  }
  return log;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.File({ filename: `${logDir}/error.log`, level: "error" }),
    new transports.File({ filename: `${logDir}/combined.log` }),
    new transports.Console({
      format: combine(winston.format.colorize(), logFormat),
    }),
  ],
});

const requestLogger = (req, res, next) => {
  logger.log({
    level: "info",
    message: `Incoming request: ${req.method} ${req.originalUrl}`,
    meta: { method: req.method, url: req.originalUrl, headers: req.headers },
  });

  res.on("finish", () => {
    logger.log({
      level: res.statusCode >= 400 ? "warn" : "info",
      message: `Response: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
      meta: {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
      },
    });
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  const status = err.status || 500;
  logger.log({
    level: "error",
    message: `Error in request ${req.method} ${req.originalUrl}`,
    meta: {
      status,
      method: req.method,
      url: req.originalUrl,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });

  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};

export { logger, requestLogger, errorLogger };
