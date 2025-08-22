const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig'); // multer middleware with Cloudinary config
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createUserDetails,
  updateUserDetails,
  addSkillToUser,
} = require('../controllers/usercontroller');

router.post('/skills', upload.single('image'), addSkillToUser);
router.post('/user-details', createUserDetails);
router.put('/user-details', updateUserDetails);
router.put('/update-profile', updateUserProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUserProfile);

module.exports = router;
