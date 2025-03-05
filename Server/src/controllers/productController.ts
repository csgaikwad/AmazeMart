import { RequestHandler } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError";
import { categoryInput, productInput } from "@ssg_csg/amazemart_common";
import ApiFeatures from "../utils/ApiFeature";

const prisma = new PrismaClient();

/* Get All Products */

export const getAllProducts: RequestHandler = async (req, res) => {
  let query: Prisma.ProductFindManyArgs = { include: { images: true } };

  const apiFeature = new ApiFeatures(query, req.query)
    .search()
    .filter()
    .pagination(2);

  const products = await prisma.product.findMany(apiFeature.query);
  res.json(products);
};

/* Get unique Product */

export const getProduct: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const id = req.params.id;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

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
    include: { images: true },
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
  const { productImgUrls, ...productData } = parsedData.data;

  const product = await prisma.product.create({
    data: {
      ...productData,
      images: {
        create: productImgUrls?.map((imageUrl: string) => ({ imageUrl })) || [],
      },
    },
    include: { images: true },
  });

  res.status(201).json({ product });
};

/* Category controller */

/* Create a category */
export const createCategory: RequestHandler = async (req, res, next) => {
  const parsed = categoryInput.safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const category = await prisma.category.create({ data: parsed.data });
  res.status(201).json({ category });
};

/* Get all categories */
export const getAllCategories: RequestHandler = async (_, res) => {
  const categories = await prisma.category.findMany();
  res.json({ categories });
};

/* Update a category */
export const updateCategory: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const parsed = categoryInput.partial().safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const category = await prisma.category.update({
    where: { id },
    data: parsed.data,
  });
  res.json({ category });
};

/* Delete a category */
export const deleteCategory: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  await prisma.category.delete({ where: { id } });
  res.status(204).send();
};
