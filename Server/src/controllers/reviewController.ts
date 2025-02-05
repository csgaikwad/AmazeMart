import { RequestHandler } from "express";
import { reviewInput } from "@ssg_csg/amazemart_common";

/* Create a review */
export const createReview: RequestHandler = async (req, res, next) => {
  const parsed = reviewInput.safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const review = await prisma.review.create({ data: parsed.data });
  res.status(201).json({ review });
};

/* Get all reviews for a product */
export const getProductReviews: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  const reviews = await prisma.review.findMany({ where: { productId } });

  if (!reviews.length) return next(new AppError("No reviews found", 404));

  res.json({ reviews });
};

/* Update a review */
export const updateReview: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const parsed = reviewInput.partial().safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const review = await prisma.review.update({ where: { id }, data: parsed.data });
  res.json({ review });
};

/* Delete a review */
export const deleteReview: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  await prisma.review.delete({ where: { id } });
  res.status(204).send();
};
