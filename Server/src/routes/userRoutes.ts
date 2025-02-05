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

const router = express.Router();

router.get("/", asyncHandler(getAllUsers));

router
  .route("/:id")
  .get(asyncHandler(getUser))
  .put(asyncHandler(updateUser))
  .delete(deleteUser);

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));

router.post("/logout", asyncHandler(logoutUser));

export default router;
