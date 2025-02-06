import express from "express";
import { asyncHandler } from "../middlewares/errorMiddleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/productController";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware";
import { isatty } from "tty";

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));

router
  .route("/:id")
  .get(asyncHandler(getProduct))
  .put(isAuthenticated, isAdmin, asyncHandler(updateProduct))
  .delete(isAuthenticated, isAdmin, asyncHandler(deleteProduct));

router.post("/", isAuthenticated, isAdmin, asyncHandler(createProduct));

router
  .route("/category")
  .get(asyncHandler(getAllCategories))
  .post(isAuthenticated, isAdmin, asyncHandler(createCategory));

router
  .route("/category/:id")
  .patch(isAuthenticated, isAdmin, asyncHandler(updateCategory))
  .delete(isAuthenticated, isAdmin, asyncHandler(deleteCategory));

export default router;
