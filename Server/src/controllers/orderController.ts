import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";
import { orderInput } from "@ssg_csg/amazemart_common";

const prisma = new PrismaClient();

/* Create New Order */

export const createOrder: RequestHandler = async (req, res, next) => {
  const parsedData = orderInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid order input", 400));
  }

  const order = await prisma.order.create({
    data: parsedData.data,
  });

  res.status(201).json({ order });
};

/* Get User Orders */

export const getUserOrders: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;

  const orders = await prisma.order.findMany({ where: { userId } });

  if (!orders.length) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.json({ orders });
};

/* Get All Orders */

export const getAllOrders: RequestHandler = async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json({ orders });
};

/* Update order status */
export const updateOrderStatus: RequestHandler = async (req, res, next) => {
  const { orderStatus } = req.body;
  const id = req.params.id;

  const order = await prisma.order.update({
    where: { id },
    data: { orderStatus },
  });

  res.json({ order });
};