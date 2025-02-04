import express, { Request, Response } from "express";
import { getUser } from "../controllers/userController";
import { asyncHandler } from "../middlewares/errorMiddleware";

const router = express.Router();

// router.get("/", asyncHandler(getUser));
router.get("/", getUser);

export default router;
