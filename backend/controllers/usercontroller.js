const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "AdminDefaultPassword";
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

    const { location, address, pincode, mobileNumber, whatsappNumber } =
      req.body;

    // Basic validation
    if (!location || !address || !pincode || !mobileNumber || !whatsappNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!decoded.id) {
      return res
        .status(401)
        .json({ message: "Invalid token payload: missing user ID" });
    }

    // Check if details already exist (optional: you might want to allow updates here or separate update route)
    const existing = await User.findById(decoded.id).select(
      "location address pincode mobileNumber whatsappNumber"
    );
    if (
      existing &&
      existing.location &&
      existing.address &&
      existing.mobileNumber &&
      existing.whatsappNumber
    ) {
      return res.status(400).json({
        message: "Details already exist. Use update endpoint instead.",
      });
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
const getUsersWithPendingWorks = async (req, res) => {
  try {
    // Find users where at least one work has status 'pending'
    // Use $elemMatch to get only the pending works inside the works array
    const users = await User.find(
      { "works.status": "pending" },
      {
        username: 1,
        gender: 1,
        email: 1,
        works: { $elemMatch: { status: "pending" } }, // only pending works
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const publishWork = async (req, res) => {
  try {
    const { userId, workId } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: userId, "works._id": workId },
      { $set: { "works.$.status": "publish" } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or work not found." });
    }
    res.status(200).json({ message: "Work status updated to publish." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteWork = async (req, res) => {
  try {
    const { userId, workId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { works: { _id: workId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or work not found." });
    }
    res.status(200).json({ message: "Work deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUsersWithPublicWorks = async (req, res) => {
  try {
    const users = await User.find(
      { "works.visibility": "public" },
      {
        username: 1,
        gender: 1,
        email: 1,
        mobileNumber: 1, // include mobile number
        whatsappNumber: 1, // include whatsapp number
        works: { $elemMatch: { visibility: "public" } }, // only public works
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { ownerId, workId, requesterId } = req.body;

    const [owner, requester] = await Promise.all([
      User.findById(ownerId),
      User.findById(requesterId),
    ]);
    if (!owner || !requester) {
      return res.status(404).json({ message: "User(s) not found." });
    }

    // Gender check: only female to female direct request allowed
    if (owner.gender === "female" && requester.gender === "female") {
      const user = await User.findOne({ _id: ownerId, "works._id": workId });
      if (!user) return res.status(404).json({ message: "Work not found." });

      const work = user.works.id(workId);
      const existingRequest = work.requests.find(
        (r) => r.requesterId.equals(requesterId) && r.status === "pending"
      );
      if (existingRequest)
        return res.status(400).json({ message: "Request already sent." });

      work.requests.push({
        requesterId,
        status: "pending",
        requestedAt: new Date(),
      });
      await user.save();

      return res.status(200).json({ message: "Request sent successfully." });
    } else {
      // Send email notification for other gender combinations
      await sendEmail(
        owner.email,
        "New connection request notification",
        `User ${requester.username} has requested to connect with you. Please contact them via email.`
      );

      return res.status(200).json({
        message: "Email notification sent instead of direct request.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Accept/Delete Request Controller with email sending for automatic mode
const updateRequestStatus = async (req, res) => {
  try {
    const { ownerId, workId, requesterId } = req.body;
    const { action } = req.params; // 'accept' or 'delete'

    const user = await User.findOne({ _id: ownerId, "works._id": workId });
    if (!user) return res.status(404).json({ message: "Work not found." });

    const work = user.works.id(workId);
    const request = work.requests.find((r) =>
      r.requesterId.equals(requesterId)
    );
    if (!request)
      return res.status(404).json({ message: "Request not found." });

    if (action === "accept") {
      request.status = "accepted";

      const requesterUser = await User.findById(requesterId);
      const ownerGender = user.gender;
      const requesterGender = requesterUser.gender;

      if (ownerGender === "female" && requesterGender === "male") {
        // If mode is automatic send email automatically
        if (work.mode === "automatic") {
          await sendEmail(
            requesterUser.email,
            "Contact details for work",
            `Hello ${requesterUser.username},\n\nContact info:\nEmail: ${user.email}\nPlease contact the owner for further communication.`
          );
        }
        // For manual mode frontend will allow owner to send email manually
      }
    } else if (action === "delete") {
      request.status = "deleted";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await user.save();
    return res
      .status(200)
      .json({ message: `Request ${action}ed successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Requests For Work (for owner dashboard)
const getRequestsForWork = async (req, res) => {
  try {
    const { ownerId, workId } = req.params;

    const user = await User.findById(ownerId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const work = user.works.id(workId);
    if (!work) return res.status(404).json({ message: "Work not found." });

    const detailedRequests = await Promise.all(
      work.requests
        .filter((r) => r.status === "pending")
        .map(async (r) => {
          const requester = await User.findById(
            r.requesterId,
            "username email gender"
          );
          return { ...r.toObject(), requester };
        })
    );

    res.status(200).json(detailedRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Manual Email Send (owner sends email manually to requester)
const manualSendEmail = async (req, res) => {
  try {
    const { ownerId, requesterId } = req.body;
    const owner = await User.findById(ownerId);
    const requester = await User.findById(requesterId);
    if (!owner || !requester) {
      return res.status(404).json({ message: "User(s) not found." });
    }

    await sendEmail(
      requester.email,
      "Contact details for work - Manual Send",
      `Hello ${requester.username},\n\nContact info:\nEmail: ${owner.email}\nPlease contact the owner for further communication.`
    );

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserContactInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(
      userId,
      "username email gender mobileNumber whatsappNumber"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      mobileNumber: user.mobileNumber || "N/A",
      whatsappNumber: user.whatsappNumber || "N/A",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getUsersWithPendingWorks,
  deleteUserById,
  publishWork,
  deleteUserId,
  deleteWork,
  getUsersWithPublicWorks,
  sendRequest,
  updateRequestStatus,
  getRequestsForWork,
  manualSendEmail,
};
