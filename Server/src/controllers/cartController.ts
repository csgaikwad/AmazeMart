import { RequestHandler } from "express";
import { cartInput } from "@ssg_csg/amazemart_common";

/* Add item to cart */
export const addToCart: RequestHandler = async (req, res, next) => {
  const parsed = cartInput.safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const cartItem = await prisma.cart.create({ data: parsed.data });
  res.status(201).json({ cartItem });
};

/* Get user cart */
export const getUserCart: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  const cartItems = await prisma.cart.findMany({ where: { userId } });

  if (!cartItems.length) return next(new AppError("No cart items found", 404));

  res.json({ cartItems });
};

/* Remove item from cart */
export const removeFromCart: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  await prisma.cart.delete({ where: { id } });
  res.status(204).send();
};
