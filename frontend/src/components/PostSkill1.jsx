import React, { useState, useEffect } from "react";
import {
  Upload,
  Plus,
  Save,
  Edit3,
  MapPin,
  Phone,
  MessageCircle,
  Hash,
  Home,
  Eye,
  Loader,
} from "lucide-react";

const categories = [
  "Technology",
  "Design",
  "Marketing",
  "Business",
  "Education",
  "Healthcare",
  "Arts",
  "Sports",
];

const subcategoriesMap = {
  Technology: [
    "Web Development",
    "Mobile App",
    "Data Science",
    "AI/ML",
    "Cybersecurity",
  ],
  Design: [
    "UI/UX Design",
    "Graphic Design",
    "Interior Design",
    "3D Modeling",
    "Photography",
  ],
  Marketing: [
    "Digital Marketing",
    "Content Marketing",
    "SEO",
    "Social Media",
    "Email Marketing",
  ],
  Business: [
    "Consulting",
    "Project Management",
    "Sales",
    "Finance",
    "Operations",
  ],
  Education: [
    "Tutoring",
    "Online Courses",
    "Language Teaching",
    "Skill Training",
    "Academic Writing",
  ],
  Healthcare: [
    "Nursing",
    "Therapy",
    "Nutrition",
    "Mental Health",
    "Fitness Training",
  ],
  Arts: ["Music", "Dance", "Writing", "Acting", "Crafts"],
  Sports: [
    "Personal Training",
    "Coaching",
    "Yoga",
    "Sports Medicine",
    "Athletics",
  ],
};

const visibilityOptions = ["public", "private", "friends"];
const API_BASE = "http://localhost:5000/api";

function PostSkillPage() {
  const token = localStorage.getItem("token");

  const [userProfile, setUserProfile] = useState({
    username: "",
    location: "",
    address: "",
    pincode: "",
    contactNumber: "",
    whatsappNumber: "",
  });
  const [skills, setSkills] = useState([]);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    category: "",
    subcategory: "",
    description: "",
    image: null, // Store File object here
    visibility: "public",
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();

        setUserProfile({
          username: data.username || "",
          location: data.location || "",
          address: data.address || "",
          pincode: data.pincode || "",
          contactNumber: data.mobilenumber || "",
          whatsappNumber: data.whatsappnumber || "",
        });
        setTempUsername(data.username || "");
        setSkills(data.works || []);
      } catch (e) {
        setError(e.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveUsername = async () => {
    if (!tempUsername.trim()) {
      alert("Username cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: tempUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserProfile((prev) => ({ ...prev, username: tempUsername }));
        setIsEditingUsername(false);
        alert("Username saved successfully!");
      } else {
        alert(data.message || "Failed to save username");
      }
    } catch (e) {
      alert("Error saving username: " + e.message);
    }
    setLoading(false);
  };

  const handleSaveDetails = async () => {
    if (
      !userProfile.location.trim() ||
      !userProfile.address.trim() ||
      !userProfile.pincode.trim() ||
      !userProfile.contactNumber.trim() ||
      !userProfile.whatsappNumber.trim()
    ) {
      alert("Please fill all details");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/user-details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location: userProfile.location,
          address: userProfile.address,
          pincode: userProfile.pincode,
          mobilenumber: userProfile.contactNumber,
          whatsappnumber: userProfile.whatsappNumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Details saved successfully!");
        setIsEditingDetails(false);
      } else {
        alert(data.message || "Failed to save details");
      }
    } catch (e) {
      alert("Error saving details: " + e.message);
    }
    setLoading(false);
  };

  const handleSkillChange = (field, value) => {
    setCurrentSkill((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "category") updated.subcategory = "";
      return updated;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentSkill((prev) => ({
        ...prev,
        image: file, // store the file object here
      }));
    }
  };

  const handleAddSkill = async () => {
    if (
      !currentSkill.category ||
      !currentSkill.subcategory ||
      !currentSkill.description
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("category", currentSkill.category);
      formData.append("subcategory", currentSkill.subcategory);
      formData.append("description", currentSkill.description);
      formData.append("visibility", currentSkill.visibility);
      if (currentSkill.image) formData.append("image", currentSkill.image);

      const res = await fetch(`${API_BASE}/skills`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type NOT set manually for FormData request
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Skill added successfully!");
        setSkills(data.works || []);
        setCurrentSkill({
          category: "",
          subcategory: "",
          description: "",
          image: null,
          visibility: "public",
        });
        setShowAddSkills(false);
      } else {
        alert(data.message || "Failed to add skill");
      }
    } catch (e) {
      alert("Error adding skill: " + e.message);
    }
    setLoading(false);
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
      alert("Skill deleted successfully!");
    } catch (e) {
      alert("Error deleting skill: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
              <Loader className="w-6 h-6 text-pink-600 animate-spin" />
              <span className="text-pink-600 font-medium text-lg">
                Loading...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 shadow-md relative">
            {error}
            <button
              onClick={() => setError("")}
              className="absolute top-2 right-3 text-red-600 hover:text-red-800 font-bold"
              aria-label="Close error message"
              style={{ lineHeight: "1" }}
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-pink-600 mb-3 animate-fade-in">
            My Professional Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Showcase your skills and expertise professionally and impressively
          </p>
        </header>

        {/* Profile Section */}
        <section className="bg-white rounded-3xl shadow-2xl p-10 mb-12 transform transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex flex-col items-center gap-6">
            {/* Animated Avatar */}
            <div className="w-40 h-40 rounded-full bg-pink-100 border-8 border-pink-300 shadow-lg flex items-center justify-center animate-pulse-scale">
              <span className="text-7xl font-extrabold text-pink-600 select-none">
                {userProfile.username
                  ? userProfile.username.charAt(0).toUpperCase()
                  : "U"}
              </span>
            </div>

            {/* Username with smooth fade edit */}
            <div className="relative h-14">
              {!isEditingUsername && (
                <h2 className="text-3xl font-bold text-pink-600 flex items-center gap-3 animate-fade-in">
                  {userProfile.username || "Username"}
                  <button
                    onClick={() => {
                      setTempUsername(userProfile.username);
                      setIsEditingUsername(true);
                    }}
                    aria-label="Edit username"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                </h2>
              )}
              {isEditingUsername && (
                <div className="flex items-center gap-3 animate-fade-in-up">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xl"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsEditingUsername(false)}
                    className="text-gray-600 hover:text-gray-900 text-3xl font-bold leading-none"
                    aria-label="Cancel username edit"
                    type="button"
                  >
                    ×
                  </button>
                  <button
                    onClick={handleSaveUsername}
                    disabled={loading || !tempUsername.trim()}
                    className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-700 transition"
                    aria-label="Save username"
                    type="button"
                  >
                    <Save className="w-5 h-5" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="mt-12 max-w-3xl mx-auto bg-pink-50 rounded-2xl p-8 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-pink-600">
                Contact Information
              </h3>
              {!isEditingDetails && (
                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition-colors"
                  aria-label="Edit contact information"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  field: "location",
                  type: "text",
                  placeholder: "Enter city",
                },
                {
                  icon: <Hash className="w-5 h-5" />,
                  label: "Pincode",
                  field: "pincode",
                  type: "text",
                  placeholder: "Enter pincode",
                },
                {
                  icon: <Home className="w-5 h-5" />,
                  label: "Address",
                  field: "address",
                  type: "text",
                  placeholder: "Enter street address",
                  colSpan: 2,
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Contact Number",
                  field: "contactNumber",
                  type: "tel",
                  placeholder: "Enter contact number",
                },
                {
                  icon: <MessageCircle className="w-5 h-5" />,
                  label: "WhatsApp Number",
                  field: "whatsappNumber",
                  type: "tel",
                  placeholder: "Enter WhatsApp number",
                },
              ].map(({ icon, label, field, type, placeholder, colSpan }) => (
                <div
                  key={field}
                  className={`space-y-1 ${
                    colSpan === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="flex items-center gap-2 text-pink-700 font-semibold text-sm">
                    {icon}
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={userProfile[field]}
                    disabled={!isEditingDetails}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full p-3 rounded-lg border transition ${
                      isEditingDetails
                        ? "border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            {isEditingDetails && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSaveDetails}
                  disabled={loading}
                  className="flex items-center gap-3 bg-pink-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-700 transform hover:scale-105 transition"
                  aria-label="Save contact details"
                >
                  {loading ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    <Save className="w-6 h-6" />
                  )}
                  {loading ? "Saving..." : "Save Details"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-pink-600">My Skills</h2>
            <button
              onClick={() => setShowAddSkills(!showAddSkills)}
              className="flex items-center gap-3 bg-pink-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              Add Skills
            </button>
          </div>

          {skills.length === 0 && (
            <p className="text-center text-gray-600">No skills added yet.</p>
          )}
          {skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 shadow-md relative group hover:shadow-lg hover:translate-y-[-4px] transition-transform duration-300"
                >
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-2xl font-bold select-none"
                    title="Delete Skill"
                    aria-label="Delete skill"
                  >
                    ×
                  </button>
                  <h3 className="font-semibold text-pink-600 text-xl">
                    {skill.category}
                  </h3>
                  <p className="text-gray-600 text-base">{skill.subcategory}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    {skill.description}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium select-none">
                      {skill.visibility || "public"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Skill Form */}
          {showAddSkills && (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-200 shadow-md animate-slide-down max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-pink-600 mb-6">
                Add New Skill
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-700">
                    Category
                  </label>
                  <select
                    value={currentSkill.category}
                    onChange={(e) =>
                      handleSkillChange("category", e.target.value)
                    }
                    className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-700">
                    Subcategory
                  </label>
                  <select
                    value={currentSkill.subcategory}
                    onChange={(e) =>
                      handleSkillChange("subcategory", e.target.value)
                    }
                    disabled={!currentSkill.category}
                    className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-pink-100"
                  >
                    <option value="">Select Subcategory</option>
                    {currentSkill.category &&
                      subcategoriesMap[currentSkill.category]?.map((subcat) => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-pink-700">
                  Description
                </label>
                <textarea
                  value={currentSkill.description}
                  onChange={(e) =>
                    handleSkillChange("description", e.target.value)
                  }
                  placeholder="Describe your skill and experience..."
                  rows={4}
                  className="w-full p-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
                {/* Upload Image */}
                <div>
                  <label className="flex items-center gap-2 text-pink-700 font-semibold text-sm cursor-pointer select-none">
                    <Upload className="w-6 h-6" />
                    Upload Image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {currentSkill.image && (
                    <span className="text-pink-600 text-sm mt-1 block select-text">
                      {currentSkill.image.name} selected
                    </span>
                  )}
                </div>

                {/* Visibility */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-700 flex items-center gap-3">
                    <Eye className="w-6 h-6" />
                    Visibility
                  </label>
                  <select
                    value={currentSkill.visibility}
                    onChange={(e) =>
                      handleSkillChange("visibility", e.target.value)
                    }
                    className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {visibilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-6">
                <button
                  onClick={() => setShowAddSkills(false)}
                  className="px-6 py-3 text-pink-700 font-semibold rounded-full hover:underline transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  disabled={loading}
                  className="flex items-center gap-3 bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                  {loading ? "Adding..." : "Add Skill"}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Animations and styles */}
      <style jsx>{`
        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
            background-color: #fed7e2;
          }
          50% {
            transform: scale(1.05);
            background-color: #fbb6ce;
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 3s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default PostSkillPage;
