import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (image: string, folder: string) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "amaze-photos",
    public_id: `property-photos/photo-${Date.now()}`,
    resource_type: "image",
  });
  return { imageUrl: result.secure_url, publicId: result.public_id };
};

export const deleteFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};
