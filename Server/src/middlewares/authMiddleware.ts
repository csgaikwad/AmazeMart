import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import AppError from "../utils/AppError";
import { asyncHandler } from "./errorMiddleware";

const prisma = new PrismaClient();

// Extend Request type with user
interface AuthenticatedRequest extends Request {
  user?: User;
}

// Authentication Middleware
export const isAuthenticated: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError("Not authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    (req as unknown as AuthenticatedRequest).user = user;
    next();
  }
);

// Admin Middleware
export const isAdmin: RequestHandler = asyncHandler(async (req, res, next) => {
  const user = (req as unknown as AuthenticatedRequest).user;

  if (user?.role !== "ADMIN") {
    return next(new AppError("Access denied, admin only", 403));
  }

  next();
});
