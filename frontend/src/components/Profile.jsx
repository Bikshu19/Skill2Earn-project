import React, { useState, useEffect } from "react";
import {
  Camera,
  Edit,
  Plus,
  Save,
  X,
  User,
  Briefcase,
  Zap,
  Award,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const ProfessionalProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    profilePic: null,
    skills: [],
    location: "New York, USA",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate developer creating amazing digital experiences",
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    bio: false,
  });

  const [tempValues, setTempValues] = useState({
    username: "",
    bio: "",
    newSkill: "",
  });

  const [showSkillInput, setShowSkillInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData = {
          username: "Sarah Johnson",
          bio: "Full-stack developer with 5+ years of experience in creating scalable web applications",
          skills: [
            "React",
            "Node.js",
            "Python",
            "UI/UX Design",
            "Project Management",
          ],
        };
        setProfile((prev) => ({ ...prev, ...mockData }));
        setTempValues((prev) => ({
          ...prev,
          username: mockData.username,
          bio: mockData.bio,
        }));
        setIsLoading(false);
      }, 1500);
    };
    fetchUserData();
  }, []);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    if (field === "username") {
      setTempValues((prev) => ({ ...prev, username: profile.username }));
    }
    if (field === "bio") {
      setTempValues((prev) => ({ ...prev, bio: profile.bio }));
    }
  };

  const handleSave = (field) => {
    if (field === "username" && tempValues.username.trim()) {
      setProfile((prev) => ({ ...prev, username: tempValues.username }));
    }
    if (field === "bio" && tempValues.bio.trim()) {
      setProfile((prev) => ({ ...prev, bio: tempValues.bio }));
    }
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    if (field === "username") {
      setTempValues((prev) => ({ ...prev, username: profile.username }));
    }
    if (field === "bio") {
      setTempValues((prev) => ({ ...prev, bio: profile.bio }));
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
    return profile.username ? profile.username.charAt(0).toUpperCase() : "U";
  };

  const handlePostSkill = () => {
    console.log("Navigating to post skill page");
    // Add your navigation logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-rose-400 rounded-full animate-ping"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-6 py-12">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Picture Section */}
            <div className="relative group">
              <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center transform transition-all duration-300 hover:scale-105">
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-white">
                    {getInitial()}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <button
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="absolute bottom-2 right-2 bg-white hover:bg-pink-50 text-pink-600 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-pink-200"
              >
                <Camera size={20} />
              </button>

              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              {/* Username */}
              <div className="mb-4">
                {isEditing.username ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={tempValues.username}
                      onChange={(e) =>
                        setTempValues((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="text-3xl font-bold text-white bg-white/20 border-2 border-white/30 focus:border-white rounded-lg px-4 py-2 outline-none backdrop-blur-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave("username")}
                      className="text-green-100 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <Save size={24} />
                    </button>
                    <button
                      onClick={() => handleCancel("username")}
                      className="text-red-100 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <X size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 group">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white">
                      {profile.username || "Loading..."}
                    </h1>
                    <button
                      onClick={() => handleEdit("username")}
                      className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <Edit size={24} />
                    </button>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="mb-6">
                {isEditing.bio ? (
                  <div className="flex items-start gap-3">
                    <textarea
                      value={tempValues.bio}
                      onChange={(e) =>
                        setTempValues((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      className="flex-1 text-lg text-white bg-white/20 border-2 border-white/30 focus:border-white rounded-lg px-4 py-3 outline-none backdrop-blur-sm resize-none"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleSave("bio")}
                        className="text-green-100 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={() => handleCancel("bio")}
                        className="text-red-100 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group">
                    <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                    <button
                      onClick={() => handleEdit("bio")}
                      className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-white/20 transition-all duration-300 mt-2"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Skill Button */}
      <div className="text-center">
        <button
          onClick={handlePostSkill}
          className="group relative bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-6 px-12 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden mt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative z-20 flex items-center gap-3 text-xl">
            <Briefcase size={24} />
            <a href="/postskill">Post Your Skill</a>
            <Briefcase size={24} />
          </span>
        </button>
        <p className="text-pink-600 mt-4 text-lg">
          Share your expertise with the world
        </p>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
MONGO_URL =
  "mongodb+srv://bikshutulimelli:bikshu@cluster0.dxun2jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
