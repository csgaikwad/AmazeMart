import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
// import { updateUserInput } from "../../../Common/src/index"; // Import Zod schema

const prisma = new PrismaClient();

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });
  res.json({ user });
};


// export const updateUser: RequestHandler = async (req, res) => {
//   const id = req.params.id;

//   // Validate request body using Zod
//   const parsedData = updateUserInput.safeParse(req.body);
//   if (!parsedData.success) {
//     return res.status(400).json({ error: parsedData.error.errors });
//   }

//   const user = await prisma.user.update({
//     where: { id },
//     data: parsedData.data, // Only allowed fields will be here
//   });

//   res.json({ user });
// };

