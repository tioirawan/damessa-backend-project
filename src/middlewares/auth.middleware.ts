import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { User } from '../database/models';
import ApiError from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

interface JwtPayload {
  id: string;
}

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'Unauthenticated'));
    }

    const decoded = jwt.verify(token, config.jwt.secret!) as JwtPayload;

    const currentUser = await User.findOne({
      where: { id: decoded.id, token: token },
    });

    if (!currentUser) {
      return next(new ApiError(401, 'Token is invalid'));
    }

    req.user = currentUser;

    next();
  },
);
