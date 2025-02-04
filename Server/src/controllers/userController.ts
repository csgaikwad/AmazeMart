import { Request, RequestHandler, Response } from "express";

export const getUser: RequestHandler = async(req: Request, res: Response) => {

  res.json({ message: "Hello from users" });
};
