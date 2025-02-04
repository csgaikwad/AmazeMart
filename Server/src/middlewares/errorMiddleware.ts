import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import AppError from "../utils/AppError";

// 404 Handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
};

// Global Error Handler
export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  } else if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};


// Async error handle
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


