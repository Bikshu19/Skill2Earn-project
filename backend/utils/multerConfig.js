const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skills/images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `skill_${Date.now()}`,
  },
});

const upload = multer({ storage });

module.exports = upload;
