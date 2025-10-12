import cloudinary from "../Config/Cloudinary.mjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "studio",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  }
});

const upload = multer({ storage });

export default upload;
