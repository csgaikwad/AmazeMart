import { RequestHandler } from "express";
import { categoryInput } from "@ssg_csg/amazemart_common";

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

  const category = await prisma.category.update({ where: { id }, data: parsed.data });
  res.json({ category });
};

/* Delete a category */
export const deleteCategory: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  await prisma.category.delete({ where: { id } });
  res.status(204).send();
};
