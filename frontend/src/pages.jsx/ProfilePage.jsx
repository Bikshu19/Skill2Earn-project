import React, { useState, useEffect } from "react";
import { Camera, Edit, Plus, Save, X, User } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    gender: "Male",
    profilePic: null,
    skills: ["React", "JavaScript", "Tailwind CSS"],
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    profilePic: false,
  });

  const [tempValues, setTempValues] = useState({
    username: "",
    newSkill: "",
  });

  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Mock navigation function (replace with useNavigate in actual implementation)
  const navigate = (path) => {
    console.log(`Navigation to: ${path}`);
    // In actual implementation: navigate(path);
  };

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const username = data.username || '';
          setProfile(prev => ({ ...prev, username }));
          setTempValues(prev => ({ ...prev, username }));
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        // For demo purposes, set a mock username if API fails
        setProfile(prev => ({ ...prev, username: 'Demo User' }));
        setTempValues(prev => ({ ...prev, username: 'Demo User' }));
      }
    };
    fetchUserData();
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

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

  const addSkill = () => {
    if (tempValues.newSkill.trim()) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, tempValues.newSkill.trim()],
      }));
      setTempValues((prev) => ({ ...prev, newSkill: "" }));
      setShowSkillInput(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const getInitial = () => {
    return profile.username ? profile.username.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-32 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          
          {/* Menu Button in Header */}
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleMenu}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110"
            >
              <div className="w-4 h-4 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/postskill');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700"
                >
                  Post Skill
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/viewrequests');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-gray-700"
                >
                  View Requests
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
                  {profile.username || 'Loading...'}
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

          {/* Gender */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-full">
              <User size={16} className="text-pink-500" />
              <span className="text-pink-600 font-medium">
                {profile.gender}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Gender cannot be modified
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-pink-600">Skills</h3>
              <button
                onClick={() => setShowSkillInput(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-md transform transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add Skill Input */}
            {showSkillInput && (
              <div className="flex space-x-2 mb-4 animate-fadeIn">
                <input
                  type="text"
                  value={tempValues.newSkill}
                  onChange={(e) =>
                    setTempValues((prev) => ({
                      ...prev,
                      newSkill: e.target.value,
                    }))
                  }
                  placeholder="Enter new skill"
                  className="flex-1 px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:border-pink-600"
                  autoFocus
                />
                <button
                  onClick={addSkill}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transform transition-all duration-200 hover:scale-105"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowSkillInput(false);
                    setTempValues((prev) => ({ ...prev, newSkill: "" }));
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transform transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-r from-pink-100 to-pink-50 text-pink-600 px-3 py-2 rounded-full text-sm font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transform transition-all duration-200 hover:scale-110"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
              Update Profile
            </button>
          </div>
        </div>
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