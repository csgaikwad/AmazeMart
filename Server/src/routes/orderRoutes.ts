import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", isAuthenticated, asyncHandler(createOrder));
router.get("/user/:userId", isAuthenticated, asyncHandler(getUserOrders));
router.get("/", isAuthenticated, asyncHandler(getAllOrders));

router
  .route("/:id")
  .patch(isAuthenticated, isAdmin, asyncHandler(updateOrderStatus));

export default router;
