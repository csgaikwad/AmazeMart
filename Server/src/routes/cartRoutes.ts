import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
} from "../controllers/cartController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", isAuthenticated, asyncHandler(getUserCart));
router.post("/", isAuthenticated, asyncHandler(addToCart));
router.delete("/:id", isAuthenticated, asyncHandler(removeFromCart));

export default router;
