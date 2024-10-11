const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/CloudanaryConfig'); // Import Cloudinary config

// Create a Cloudinary storage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mobile-images', // Specify the folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed image formats
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
