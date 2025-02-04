import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// 404 and global error handling
app.use("*", notFoundHandler);
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
