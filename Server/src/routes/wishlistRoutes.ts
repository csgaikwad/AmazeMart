import express from "express";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:userId", isAuthenticated, asyncHandler(getUserWishlist));
router.post("/", isAuthenticated, asyncHandler(addToWishlist));
router.delete("/:id", isAuthenticated, asyncHandler(removeFromWishlist));

export default router;
