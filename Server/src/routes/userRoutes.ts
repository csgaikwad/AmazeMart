import express from "express";
import {
  getAllUsers,
  getUser,
//   updateUser,
} from "../controllers/userController";
import { asyncHandler } from "../middlewares/errorMiddleware";

const router = express.Router();

router.get("/", asyncHandler(getAllUsers));
router.route("/:id").get(asyncHandler(getUser))
// .put(asyncHandler(updateUser));

export default router;
