import { Request, Response } from "express";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUtils";
import AppError from "../utils/AppError";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) throw new AppError("No image provided", 400);

    const uploadResponse = await uploadToCloudinary(image, "uploads");
    res.json(uploadResponse);
  } catch (error) {
    throw new AppError("Image upload failed", 500);
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.params;
    if (!publicId) throw new AppError("Public ID is required", 400);

    await deleteFromCloudinary(publicId);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    throw new AppError("Image deletion failed", 500);
  }
};
