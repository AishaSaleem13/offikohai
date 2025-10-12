import multer from "multer";
import cloudinary from "../Config/Cloudinary.mjs";
import streamifier from "streamifier";

// ✅ Configure Cloudinary

// ✅ Create a basic multer instance (no disk or cloud storage)
const upload = multer();

// ✅ Function to upload file buffer to Cloudinary
export const uploadToCloudinary = async (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ✅ Export multer for route usage
export default upload;