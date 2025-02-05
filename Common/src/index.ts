import { z } from "zod";

export const registerInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  userImgUrl: z.string().optional(),
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
  pictureUrl: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UpdateUserInputTypes = z.infer<typeof updateUserInput>;


export const productInput = z.object({
  title: z.string(),
  description: z.string().min(6),
  price: z.number(),
  productImgUrls: z.array(z.string()).optional(),
});

export type ProductInputTypes = z.infer<typeof productInput>;
