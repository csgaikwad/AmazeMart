import { Request, RequestHandler, Response } from "express";

export const getProduct: RequestHandler = (req: Request, res: Response) => {
  res.json({ message: "Hello from products" });
};
