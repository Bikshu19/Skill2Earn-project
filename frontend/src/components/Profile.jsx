import React, { useState, useEffect } from "react";
import { Camera, Edit, Save, X } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
  });

  const [tempValues, setTempValues] = useState({
    username: "",
  });

  // Mock navigation function (replace with useNavigate in actual implementation)
  const navigate = (path) => {
    console.log(`Navigation to: ${path}`);
    // In actual implementation: navigate(path);
  };

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://skill2earn-project.onrender.com/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const username = data.username || "";
          setProfile((prev) => ({ ...prev, username }));
          setTempValues((prev) => ({ ...prev, username }));
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        // fallback demo user
        setProfile((prev) => ({ ...prev, username: "Demo User" }));
        setTempValues((prev) => ({ ...prev, username: "Demo User" }));
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    if (field === "username") {
      setTempValues((prev) => ({ ...prev, username: profile.username }));
    }
  };

  const handleSave = (field) => {
    if (field === "username" && tempValues.username.trim()) {
      setProfile((prev) => ({ ...prev, username: tempValues.username }));
    }
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    if (field === "username") {
      setTempValues((prev) => ({ ...prev, username: profile.username }));
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, profilePic: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitial = () => {
    return profile.username ? profile.username.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4 flex flex-col items-center">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 mb-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-32 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Profile Picture */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitial()}
                  </span>
                )}
              </div>

              {/* Camera Button */}
              <button
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="absolute bottom-2 right-2 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Camera size={16} />
              </button>

              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Username */}
          <div className="text-center mb-6">
            {isEditing.username ? (
              <div className="flex items-center justify-center space-x-2 animate-fadeIn">
                <input
                  type="text"
                  value={tempValues.username}
                  onChange={(e) =>
                    setTempValues((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="text-xl font-bold text-pink-600 bg-transparent border-b-2 border-pink-300 focus:border-pink-600 outline-none text-center"
                  autoFocus
                />
                <button
                  onClick={() => handleSave("username")}
                  className="text-green-600 hover:text-green-700 transform transition-all duration-200 hover:scale-110"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={() => handleCancel("username")}
                  className="text-red-600 hover:text-red-700 transform transition-all duration-200 hover:scale-110"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 group">
                <h1 className="text-2xl font-bold text-pink-600">
                  {profile.username || "Loading..."}
                </h1>
                <button
                  onClick={() => handleEdit("username")}
                  className="text-pink-400 hover:text-pink-600 opacity-0 group-hover:opacity-100 transform transition-all duration-200 hover:scale-110"
                >
                  <Edit size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Post Skill Button BELOW the card */}
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/postskill")}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <a href="/postskill">+ Post Skill</a>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
