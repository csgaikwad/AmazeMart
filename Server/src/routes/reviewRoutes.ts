import express from "express";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:productId", asyncHandler(getProductReviews));
router.post("/", isAuthenticated, asyncHandler(createReview));

router
  .route("/:id")
  .patch(isAuthenticated, asyncHandler(updateReview))
  .delete(isAuthenticated, asyncHandler(deleteReview));

export default router;
