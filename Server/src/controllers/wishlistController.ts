import { RequestHandler } from "express";
import { wishlistInput } from "@ssg_csg/amazemart_common";

/* Add item to wishlist */
export const addToWishlist: RequestHandler = async (req, res, next) => {
  const parsed = wishlistInput.safeParse(req.body);
  if (!parsed.success) return next(new AppError("Invalid input", 400));

  const wishlistItem = await prisma.wishlist.create({ data: parsed.data });
  res.status(201).json({ wishlistItem });
};

/* Get user wishlist */
export const getUserWishlist: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  const wishlistItems = await prisma.wishlist.findMany({ where: { userId } });

  if (!wishlistItems.length) return next(new AppError("No wishlist items found", 404));

  res.json({ wishlistItems });
};

/* Remove item from wishlist */
export const removeFromWishlist: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  await prisma.wishlist.delete({ where: { id } });
  res.status(204).send();
};
