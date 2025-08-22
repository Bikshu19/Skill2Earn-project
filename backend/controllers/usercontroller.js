const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin";
const dotenv = require("dotenv"); // Adjust path to your User model

const registerUser = async (req, res) => {
  try {
    const { username, gender, password, email } = req.body;

    // Simple validation
    if (!username || !gender || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    // Check if user with email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user instance
    const newUser = new User({
      username,
      gender,
      email,
      password: hashedPassword,
      role: "user", // default role
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Respond with created user info (exclude password)
    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      gender: savedUser.gender,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user is admin by matching with default admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token for admin
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ token, role: "admin" });
    }

    // Find user in DB by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token for user with role info
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
const getUserProfile = async (req, res) => {
  try {
    // Extract Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    // Find user by decoded ID, selecting username and gender fields
    const user = await User.findById(decoded.id).select("username gender");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with username and gender
    return res.json({ username: user.username, gender: user.gender });
  } catch (error) {
    console.error("Get user profile error:", error);

    // Check if error is from token verification failure
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Generic server error response for others
    return res
      .status(500)
      .json({ message: "Server error while fetching user profile" });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    // Get authorization token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get new username from request body
    const { username } = req.body;

    // Basic validation
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Fetch current user data to preserve gender
    const currentUser = await User.findById(decoded.id).select("username");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only username, keep existing gender
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { username, gender: currentUser.gender },
      { new: true, runValidators: true, select: "username gender" }
    );

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update user profile error:", error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Handle validation or other errors
    return res
      .status(500)
      .json({ message: "Server error while updating profile" });
  }
};

const createUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);
    console.log("Request body:", req.body);

    const { location, address, pincode, mobilenumber, whatsappnumber } =
      req.body;

    // Basic validation
    if (!location || !address || !pincode || !mobilenumber || !whatsappnumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!decoded.id) {
      return res
        .status(401)
        .json({ message: "Invalid token payload: missing user ID" });
    }

    // Check if user already has details set (assumes these fields exist on User)
    const existing = await User.findById(decoded.id).select(
      "location address pincode mobilenumber whatsappnumber"
    );
    if (existing && existing.location && existing.address) {
      return res
        .status(400)
        .json({ message: "Details already exist. Use update instead." });
    }

    // Save details on user document
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { location, address, pincode, mobileNumber, whatsappNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(201).json({
      message: "Details saved successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    console.error("Create user details error:", error);
    res
      .status(500)
      .json({ message: error.message || "Server error while saving details" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { location, address, pincode, mobilenumber, whatsappnumber } =
      req.body;

    if (!location && !address && !pincode && !mobilenumber && !whatsappnumber) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      // Only include fields that are present in req.body
      {
        ...(location && { location }),
        ...(address && { address }),
        ...(pincode && { pincode }),
        ...(mobilenumber && { mobilenumber }),
        ...(whatsappnumber && { whatsappnumber }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User details not found. Use create instead." });
    }

    res.status(200).json({
      message: "Details updated successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    console.error("Update user details error:", error);
    res.status(500).json({ message: "Server error while updating details" });
  }
};

const addSkillToUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id)
      return res.status(401).json({ message: "Invalid token payload" });

    const { category, subcategory, description, mode, visibility } = req.body;
    if (!category || !subcategory || !description)
      return res.status(400).json({
        message: "Category, subcategory, and description are required",
      });

    if (!req.file || !req.file.path)
      return res.status(400).json({ message: "Image file is required" });

    const newWork = {
      category,
      subcategory,
      description,
      mode: mode || "manual",
      image: [req.file.path],
      visibility: visibility || "public",
      status: "pending",
    };

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $push: { works: newWork } },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res
      .status(201)
      .json({ message: "Skill added", works: updatedUser.works });
  } catch (error) {
    console.error("Add skill error:", error);
    return res.status(500).json({ message: "Server error adding skill" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createUserDetails,
  updateUserDetails,
  addSkillToUser,
};
