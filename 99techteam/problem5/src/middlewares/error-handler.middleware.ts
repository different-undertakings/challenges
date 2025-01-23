import { Request, Response, NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import logger from "../infra/logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  logger.error(`[Error] ${req.method} ${req.url} - ${message}`);

  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
