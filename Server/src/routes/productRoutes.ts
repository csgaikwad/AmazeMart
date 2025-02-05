import express, { Request, Response } from "express";
import {
    createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController";
import { asyncHandler } from "../middlewares/errorMiddleware";

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));

router
  .route("/:id")
  .get(asyncHandler(getProduct))
  .put(asyncHandler(updateProduct))
  .delete(asyncHandler(deleteProduct));

router.post("/", asyncHandler(createProduct));

export default router;
