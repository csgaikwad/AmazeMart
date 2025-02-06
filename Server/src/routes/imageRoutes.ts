import express from "express";
import { uploadImage, deleteImage } from "../controllers/imageController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/upload", isAuthenticated, asyncHandler(uploadImage));
router.delete("/delete/:publicId", isAuthenticated, asyncHandler(deleteImage));

export default router;
