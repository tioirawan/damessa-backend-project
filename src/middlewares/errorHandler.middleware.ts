import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import ApiError from '../utils/ApiError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = 500;
    const message = 'Internal Server Error';
    error = new ApiError(statusCode, message, false);
  }

  const { statusCode, message, isOperational } = error as ApiError;

  // Log error in development
  if (config.env === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    // show stack trace in development for non-operational errors
    ...(config.env === 'development' && !isOperational
      ? { stack: err.stack }
      : {}),
  });
};
