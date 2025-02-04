import { Request, RequestHandler, Response } from "express";

export const getOrder: RequestHandler = (req: Request, res: Response) => {
  res.json({ message: "Hello from orders" });
};
