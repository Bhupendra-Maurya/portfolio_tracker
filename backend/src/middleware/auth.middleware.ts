import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body.userId) {
    return next(createError(401, "Authentication required"));
  }
  next();
}; 