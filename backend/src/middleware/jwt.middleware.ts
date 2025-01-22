import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { config } from "../config/config";
import User from "../models/user.model";
import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

export const authenticateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw createError(401, "No token provided");
    }

    if (!config.JWT_SECRET) {
      throw createError(500, "JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as CustomJwtPayload;
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw createError(401, "Invalid token");
    }

    req.body.userId = user.userId;
    next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    next(createError(401, "Invalid token"));
  }
}; 