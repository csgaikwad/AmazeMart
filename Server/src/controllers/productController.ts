import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";
import { productInput } from "@ssg_csg/amazemart_common";

const prisma = new PrismaClient();

/* Get All Products */

export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

/* Get unique Product */

export const getProduct: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const id = req.params.id;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.json({ product });
};

/* Update Product */

export const updateProduct: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const id = req.params.id;

  // Validate request body using Zod
  const parsedData = productInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid product input", 400));
  }

  const product = await prisma.product.update({
    where: { id },
    data: parsedData.data, // Only allowed fields will be here
  });

  res.json({ product });
};

/* Delete Product */

export const deleteProduct: RequestHandler = async (req, res) => {
  const id = req.params.id;
  await prisma.product.delete({ where: { id } });
  res.json({ message: `Product deleted succesfully!` });
};

/* Create Product */

export const createProduct: RequestHandler = async (req, res, next) => {
  const parsedData = productInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid product input", 400));
  }
  const product = await prisma.product.create({ data: parsedData.data });
  res.status(201).json({ product });
};
