import { NextFunction, Request, Response } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler =
  (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
