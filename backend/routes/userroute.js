const express = require("express");
const router = express.Router();
const { uploadSkillImage, uploadProfilePic } = require("../utils/multerConfig"); // updated multer middleware exports

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createUserDetails,
  updateUserDetails,
  addSkillToUser,
  getUsersWithPendingWorks,
  deleteUserById,
  publishWork,
  deleteWork,
  deleteUserId,
  getUsersWithPublicWorks,
  sendRequest,
  updateRequestStatus,
  getRequestsForWork,
  manualSendEmail,
  getSkillsByEmail,
  getUsersWithWorks,
} = require("../controllers/usercontroller");

// Requests
router.get("/users-with-works", getUsersWithWorks);
router.get("/skills", getSkillsByEmail);
router.post("/works/request", sendRequest);
router.put("/works/request/:action", updateRequestStatus);
router.get("/users/:ownerId/works/:workId/requests", getRequestsForWork);
router.post("/works/manual-send-email", manualSendEmail);

// User works
router.put("/users/:userId/works/:workId/publish", publishWork);
router.delete("/users/:userId/works/:workId", deleteWork);

// User accounts
router.delete("/users/:userId", deleteUserById);
router.delete("/delete-user/:id", deleteUserById);

// Public and pending users
router.get("/public-users", getUsersWithPublicWorks);
router.get("/pending-users", getUsersWithPendingWorks);

// Skills with image uploads
router.post("/skills", uploadSkillImage.single("image"), addSkillToUser);

// User details
router.post("/user-details", createUserDetails);
router.put("/user-details", updateUserDetails);

// Profile picture upload route
router.post(
  "/upload-profile-pic",
  uploadProfilePic.single("profilepic"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.json({ url: req.file.path });
  }
);

// Profile update
router.put("/update-profile", updateUserProfile);

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserProfile);

module.exports = router;
