import express, { Request, Response } from "express";
import { getOrder } from "../controllers/orderController";

const router = express.Router();

router.get("/", getOrder);

export default router;
