import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./apiError";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const cloudUpload = async (fileLocation: string | undefined) => {
  try {
    if (!fileLocation) return null;

    const uploaded = await cloudinary.uploader.upload(fileLocation, {
      resource_type: "auto",
      use_filename: true,
      unique_filename: true,
    });
    return uploaded;
  } catch (error) {
    throw new ApiError(400, "Error in uploading photo");
  } finally {
    if (fileLocation) fs.unlinkSync(fileLocation);
  }
};

export default cloudUpload;
