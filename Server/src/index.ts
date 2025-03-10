import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import imageRoutes from "./routes/imageRoutes";
import cartRoutes from "./routes/cartRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import { isAdmin, isAuthenticated } from "./middlewares/authMiddleware";

// Load environment variables
dotenv.config();

// Handle uncaught error
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

// To check if the server is working or not
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

// Public Routes (No Authentication Required)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

// Protected Routes (Authenticated Users Only)
app.use("/api/v1/cart", isAuthenticated, cartRoutes);
app.use("/api/v1/wishlist", isAuthenticated, wishlistRoutes);
app.use("/api/v1/review", isAuthenticated, reviewRoutes);
app.use("/api/v1/image", isAuthenticated, imageRoutes);
app.use("/api/v1/orders", isAuthenticated, orderRoutes);

// 404 and global error handling
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Shutting down server");

  server.close(() => {
    process.exit(1);
  });
});
