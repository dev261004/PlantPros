import pkg from 'cloudinary';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const { v2: cloudinary } = pkg;
// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'plants', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file formats
    },
});

// Configure multer to use Cloudinary storage
const upload = multer({ storage });

export { upload };
