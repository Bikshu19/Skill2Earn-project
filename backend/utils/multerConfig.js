const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Storage for skill images
const skillStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skills/images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `skill_${Date.now()}`,
  },
});

// Multer upload middleware for skill images
const uploadSkillImage = multer({ storage: skillStorage });

// Storage for profile pictures
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pics',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `profilepic_${Date.now()}`,
  },
});

// Multer upload middleware for profile pictures
const uploadProfilePic = multer({ storage: profilePicStorage });

module.exports = {
  uploadSkillImage,
  uploadProfilePic,
};
