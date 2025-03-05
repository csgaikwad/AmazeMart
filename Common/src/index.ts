import { z } from "zod";

export const registerInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  userImgUrl: z.string().url().optional(),
});

export type RegisterInputTypes = z.infer<typeof registerInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninInputTypes = z.infer<typeof signinInput>;

// In common/validation.ts

export const updateUserInput = z.object({
  name: z.string().min(3),
  pictureUrl: z.string().url().optional(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UpdateUserInputTypes = z.infer<typeof updateUserInput>;

export const productInput = z.object({
  title: z.string().min(1),
  description: z.string().min(6),
  price: z.number(),
  productImgUrls: z.array(z.string().url()).min(1),
});

export type ProductInputTypes = z.infer<typeof productInput>;

export const orderInput = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  phoneNo: z.string().min(10).max(15),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  pincode: z.string().min(4).max(10),
  itemsPrice: z.number().positive(),
  taxPrice: z.number().positive(),
  shippingPrice: z.number().positive(),
  totalPrice: z.number().positive(),
  paymentId: z.string().min(1),
  paymentStatus: z.string().min(1),
  orderStatus: z.string().optional(),
  paidAt: z.date().optional(),
  deliveredAt: z.date().optional(),
});

export type OrderInputTypes = z.infer<typeof orderInput>;

export const reviewInput = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  stars: z.number().min(1).max(5),
  comment: z.string().min(3),
});

export type ReviewInputTypes = z.infer<typeof reviewInput>;

export const cartInput = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

export type CartInputTypes = z.infer<typeof cartInput>;

export const wishlistInput = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

export type WishlistInputTypes = z.infer<typeof wishlistInput>;

export const categoryInput = z.object({
  name: z.string().min(2),
});

export type CategoryInputTypes = z.infer<typeof categoryInput>;

// Fixed QueryParams Schema
export const queryParamsSchema = z.object({
  keyword: z.string().optional(),
  price: z
    .object({
      gte: z.number().optional(),
      lte: z.number().optional(),
    })
    .optional(),
  rating: z
    .object({
      gte: z.number().optional(),
      lte: z.number().optional(),
    })
    .optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type QueryParamsTypes = z.infer<typeof queryParamsSchema>;
