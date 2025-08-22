const mongoose = require('mongoose');


const workSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: { type: String, required: true },
 mode: { type: String, enum: ["manual", "automatic"], default: "manual" },
  image: { type: [String], default: [] },
  video: { type: [String], default: [] },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilepic: { type: String },
  location: { type: String },
  address: { type: String },
  pincode: { type: String },
  mobileNumber: { type: String },
  whatsappNumber: { type: String },
  works: { type: [workSchema], default: [] },
  role: { type: String, default: "user" }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);