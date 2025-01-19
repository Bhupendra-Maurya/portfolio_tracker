import { Request, Response } from "express";
import { HttpError } from "http-errors";

export const globalErrorHandler = (err: HttpError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : "",
  });
  return;
};
