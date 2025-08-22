const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'deleted'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now }
});

const workSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: { type: String, required: true },
  mode: { type: String, enum: ["manual", "automatic"], default: "manual" },
  image: { type: [String], default: [] },
  video: { type: [String], default: [] },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  mobileNumber: { type: String },    // Contact info per work
  whatsappNumber: { type: String },  // Contact info per work
  requests: { type: [requestSchema], default: [] }  // Connection requests to this work
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
  mobileNumber: { type: String },       // Contact info at user level (optional)
  whatsappNumber: { type: String },     // Contact info at user level (optional)
  works: { type: [workSchema], default: [] },
  role: { type: String, default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
