import React, { useState, useEffect } from "react";
import {
  Camera,
  Upload,
  Plus,
  Save,
  Edit3,
  MapPin,
  Phone,
  MessageCircle,
  User,
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

const visibilityOptions = ["public", "private"];

const API_BASE = "http://localhost:5000/api"; // Make sure API base URL matches your backend

function PostSkillPage() {
  const token = localStorage.getItem("token");

  // Username states
  const [username, setUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [inputUsername, setInputUsername] = useState("");

  // User details states
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [whatsappnumber, setWhatsappNumber] = useState("");
  const [detailsExist, setDetailsExist] = useState(false);

  // Skills states
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("manual");
  const [visibility, setVisibility] = useState("public");
  const [imageFile, setImageFile] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  // Fetch profile and skills on mount
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch user info
        const resUser = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch user");
        const userData = await resUser.json();
        setUsername(userData.username);
        setInputUsername(userData.username);
        if (userData.works) setSkills(userData.works);

        // Fetch user details
        const resDetails = await fetch(`${API_BASE}/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resDetails.ok) throw new Error("Failed to fetch user details");
        const detailsData = await resDetails.json();
        setLocation(detailsData.location || "");
        setAddress(detailsData.address || "");
        setPincode(detailsData.pincode || "");
        setMobileNumber(detailsData.mobilenumber || "");
        setWhatsappNumber(detailsData.whatsappnumber || "");
        setDetailsExist(true);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [token]);

  // Username handlers
  const toggleUsernameEdit = () => {
    setIsEditingUsername(!isEditingUsername);
    setInputUsername(username);
  };

  const saveUsername = async () => {
    if (!inputUsername.trim()) {
      alert("Username cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: inputUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsername(inputUsername);
        setIsEditingUsername(false);
        alert("Username updated successfully");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Error updating username: " + err.message);
    }
    setLoading(false);
  };

  // Save user details (add or update)
  const handleSaveDetails = async () => {
    if (!location || !address || !pincode || !mobilenumber || !whatsappnumber) {
      alert("Please fill all details");
      return;
    }
    setLoading(true);
    try {
      const url = `${API_BASE}/user-details`;
      const method = detailsExist ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location,
          address,
          pincode,
          mobilenumber,
          whatsappnumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(
          detailsExist
            ? "Details updated successfully"
            : "Details saved successfully"
        );
        setDetailsExist(true);
      } else {
        alert(data.message || "Failed to save details");
      }
    } catch (err) {
      alert("Error saving details: " + err.message);
    }
    setLoading(false);
  };

  // On image file chosen
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  // Add skill handler
  const handleAddSkill = async () => {
    if (
      !category.trim() ||
      !subcategory.trim() ||
      !description.trim() ||
      !mode ||
      !imageFile
    ) {
      alert("Please complete all skill fields and select an image");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("description", description);
      formData.append("mode", mode);
      formData.append("visibility", visibility);
      formData.append("image", imageFile);

      const res = await fetch(`${API_BASE}/skills`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("Skill added successfully");
        setSkills(data.works);
        setCategory("");
        setSubcategory("");
        setDescription("");
        setMode("manual");
        setVisibility("public");
        setImageFile(null);
        setShowAddSkillForm(false);
      } else {
        alert(data.message || "Failed to add skill");
      }
    } catch (err) {
      alert("Error adding skill: " + err.message);
    }
    setLoading(false);
  };

  // Delete skill handler
  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
      alert("Skill deleted successfully");
    } catch (err) {
      alert("Failed to delete skill: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <Loader className="animate-spin text-pink-600" size={48} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 relative">
          {error}
          <button
            className="absolute top-2 right-3 font-bold cursor-pointer"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}

      <h1 className="text-center text-3xl font-bold text-pink-600 mb-6">
        Post Skill
      </h1>

      {/* Username */}
      <div className="mb-6 text-center">
        {isEditingUsername ? (
          <>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={saveUsername}
              className="bg-pink-600 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={toggleUsernameEdit}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="text-xl font-semibold mr-3">{username}</span>
            <button
              onClick={toggleUsernameEdit}
              className="bg-pink-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobilenumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsappnumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleSaveDetails}
        className="bg-pink-600 text-white px-6 py-2 rounded mb-8 w-full"
      >
        {detailsExist ? "Update Details" : "Save Details"}
      </button>

      <hr className="mb-6" />

      {/* Add Skill Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Add New Skill
        </h2>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="text"
          placeholder="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-3 h-24"
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3 w-full"
        />
        {imageFile && <span>{imageFile.name} selected</span>}
        <button
          onClick={handleAddSkill}
          className="bg-pink-600 text-white px-6 py-2 rounded w-full"
        >
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div>
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Your Skills
        </h2>
        {skills.length === 0 && <p>No skills added yet.</p>}
        {skills.map((skill) => (
          <div key={skill._id} className="border p-4 rounded mb-3 relative">
            <p>
              <strong>Category:</strong> {skill.category}
            </p>
            <p>
              <strong>Subcategory:</strong> {skill.subcategory}
            </p>
            <p>
              <strong>Description:</strong> {skill.description}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    skill.status === "approved"
                      ? "green"
                      : skill.status === "pending"
                      ? "orange"
                      : "red",
                }}
              >
                {skill.status || "pending"}
              </span>
            </p>
            <button
              onClick={() => handleDeleteSkill(skill._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostSkillPage;
