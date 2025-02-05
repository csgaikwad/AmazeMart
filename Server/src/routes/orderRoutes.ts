import express from "express";
import { createOrder, getAllOrders, getUserOrders } from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/", getAllOrders);

export default router;
