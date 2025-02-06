import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { asyncHandler } from "../middlewares/errorMiddleware";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, asyncHandler(getAllUsers));

router
  .route("/:id")
  .get(isAuthenticated, asyncHandler(getUser))
  .patch(isAuthenticated, asyncHandler(updateUser))
  .delete(isAuthenticated, deleteUser);

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));

router.post("/logout", asyncHandler(logoutUser));

export default router;
