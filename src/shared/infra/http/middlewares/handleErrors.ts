/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import { AppError } from "../../../errors/AppError";

export function handleErrors(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error ${err.message}`,
  });
}
