import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerInput,
  signinInput,
  updateUserInput,
} from "@ssg_csg/amazemart_common"; // Import Zod schema
import AppError from "../utils/AppError";

const prisma = new PrismaClient();

/* Get all Users */

export const getAllUsers: RequestHandler = async (req, res): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

/* Get unique User */

export const getUser: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({ user });
};

/* Update User */

export const updateUser: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const id = req.params.id;

  // Validate request body using Zod
  const parsedData = updateUserInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid user input", 400));
  }

  const user = await prisma.user.update({
    where: { id },
    data: parsedData.data, // Only allowed fields will be here
  });

  res.json({ user });
};

/* Delete User */

export const deleteUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  await prisma.user.delete({ where: { id } });
  res.json({ message: `User deleted succesfully!` });
};

/* Register new User */

export const registerUser: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const parsedData = registerInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid user input", 400));
  }

  const { password, ...userData } = parsedData.data;

  if (!password) return next(new AppError("Password is required", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });

  res.status(201).json({ user });
};

/* Login User */

export const loginUser: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  const parsedData = signinInput.safeParse(req.body);

  if (!parsedData.success) {
    return next(new AppError("Invalid user input", 400));
  }

  const user = await prisma.user.findUnique({
    where: { email: parsedData.data.email },
  });

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  const isMatch = await bcrypt.compare(parsedData.data.password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT_SECRET is not defined", 500));
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JS access
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });

  res.json({ message: "Login successful", user });
};

/* Logout User */

export const logoutUser: RequestHandler = async (req, res): Promise<void> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Logout successful" });
};
