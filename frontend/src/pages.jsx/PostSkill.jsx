import React from "react";
import PostSkill1 from "../components/PostSkill1";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function PostSkill() {
  return (
<<<<<<< HEAD
    <div>
      <Homenavbar />
      <PostSkill1 />
      <HomeFooter />
=======
  <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Post Skill</h2>

      {/* Username editing */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Username: </label>
        {isEditingUsername ? (
          <>
            <input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
            <button onClick={saveUsername} style={{ marginLeft: 8 }}>
              Save
            </button>
            <button onClick={toggleUsernameEdit} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{username}</span>
            <button onClick={toggleUsernameEdit} style={{ marginLeft: 8 }}>
              Edit
            </button>
          </>
        )}
      </div>

      {/* User details */}
      <div>
        <label>
          Location:
          <input value={location} onChange={(e) => setLocation(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Pincode:
          <input value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Mobile Number:
          <input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          WhatsApp Number:
          <input value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>

      <button onClick={handleSaveDetails} style={{ padding: '0.5rem 1.5rem', margin: '1rem 0', cursor: 'pointer' }}>
        {detailsExist ? 'Update Details' : 'Save Details'}
      </button>

      <hr />

      {/* Add Skill Form */}
      <div style={{ marginTop: '1rem' }}>
        <h3>Add New Skill</h3>

        <div>
          <label>
            Category:
            <input value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
          </label>
        </div>
        <div>
          <label>
            Subcategory:
            <input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginLeft: 8, width: '80%', height: 60 }}
            />
          </label>
        </div>
        <div>
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input type="file" name="image" accept="image/*" onChange={(e) => {
              if (e.target.files.length > 0) setImageFile(e.target.files[0]);
            }} style={{ marginLeft: 8 }} />
          </label>
          {imageFile && <span> {imageFile.name} selected</span>}
        </div>
        <button onClick={handleAddSkill} style={{ padding: '0.5rem 1.5rem', marginTop: '1rem', cursor: 'pointer' }}>
          Add Skill
        </button>
      </div>

      {/* User Skills with status and delete */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Your Skills</h3>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, textAlign: 'left' }}>
              <p><strong>Category:</strong> {skill.category}</p>
              <p><strong>Subcategory:</strong> {skill.subcategory}</p>
              <p><strong>Description:</strong> {skill.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{
                  color: skill.status === 'approved' ? 'green'
                    : skill.status === 'pending' ? 'orange'
                      : 'red',
                }}>
                  {skill.status || 'pending'}
                </span>
              </p>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete Skill
              </button>
=======
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <Loader className="w-6 h-6 text-pink-600 animate-spin" />
              <span className="text-pink-600 font-medium">Loading...</span>
>>>>>>> 3d5bea2f7ed05d11a053344186afc2bd23b6de7c
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right text-red-500 hover:text-red-700"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            My Professional Profile
          </h1>
          <p className="text-gray-600">Showcase your skills and expertise</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          {/* Profile Picture centered with username and edit icon below */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group w-40 h-40 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
              {userProfile.profilePic ? (
                <img
                  src={userProfile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-pink-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-pink-600 text-white p-3 rounded-full cursor-pointer hover:bg-pink-700 transition-colors group-hover:scale-110 transform duration-200 shadow-lg">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files[0] &&
                    handleFileUpload("profilePic", e.target.files[0])
                  }
                />
              </label>
            </div>

            <div className="flex items-center mt-4 gap-2">
              {!isEditingUsername && (
                <>
                  <h2 className="text-2xl font-semibold text-pink-600">
                    {userProfile.username || "Username"}
                  </h2>
                  <button
                    onClick={() => {
                      setTempUsername(userProfile.username);
                      setIsEditingUsername(true);
                    }}
                    aria-label="Edit username"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </>
              )}

              {isEditingUsername && (
                <>
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="border border-pink-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsEditingUsername(false)}
                    className="text-gray-600 hover:text-gray-900 transition-colors px-2"
                    aria-label="Cancel username edit"
                  >
                    ×
                  </button>
                  <button
                    onClick={handleSaveUsername}
                    disabled={loading || !tempUsername.trim()}
                    className="flex items-center gap-1 bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Save username"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Contact Information Grid with edit toggle */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-pink-600">
                Contact Information
              </h2>
              {!isEditingDetails && (
                <button
                  onClick={() => setIsEditingDetails(true)}
                  className="flex items-center gap-1 text-pink-600 hover:text-pink-800 transition-colors"
                  aria-label="Edit contact information"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={userProfile.location}
                  disabled={!isEditingDetails}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ${
                    !isEditingDetails ? "bg-gray-50 text-gray-700" : "bg-white"
                  }`}
                />
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={userProfile.pincode}
                  disabled={!isEditingDetails}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ${
                    !isEditingDetails ? "bg-gray-50 text-gray-700" : "bg-white"
                  }`}
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter street address"
                  value={userProfile.address}
                  disabled={!isEditingDetails}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ${
                    !isEditingDetails ? "bg-gray-50 text-gray-700" : "bg-white"
                  }`}
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter contact number"
                  value={userProfile.contactNumber}
                  disabled={!isEditingDetails}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ${
                    !isEditingDetails ? "bg-gray-50 text-gray-700" : "bg-white"
                  }`}
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter WhatsApp number"
                  value={userProfile.whatsappNumber}
                  disabled={!isEditingDetails}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  className={`w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-200 ${
                    !isEditingDetails ? "bg-gray-50 text-gray-700" : "bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Save Details Button */}
            {isEditingDetails && (
              <div className="flex justify-center">
                <button
                  onClick={handleSaveDetails}
                  disabled={loading}
                  className="flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Save contact details"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {loading ? "Saving..." : "Save Details"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pink-600">My Skills</h2>
            <button
              onClick={() => setShowAddSkills(!showAddSkills)}
              className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Skills
            </button>
          </div>

          {/* Skills List */}
          {skills.length === 0 && <p>No skills added yet.</p>}
          {skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200 relative group"
                >
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Skill"
                    aria-label="Delete skill"
                  >
                    ×
                  </button>
                  <h3 className="font-semibold text-pink-600">
                    {skill.category}
                  </h3>
                  <p className="text-sm text-gray-600">{skill.subcategory}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {skill.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                      {skill.visibility || "public"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Skill Form */}
          {showAddSkills && (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-200 animate-slide-down">
              <h3 className="text-lg font-semibold text-pink-600 mb-4">
                Add New Skill
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-600">
                    Category
                  </label>
                  <select
                    value={currentSkill.category}
                    onChange={(e) =>
                      handleSkillChange("category", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                  <label className="text-sm font-semibold text-pink-600">
                    Subcategory
                  </label>
                  <select
                    value={currentSkill.subcategory}
                    onChange={(e) =>
                      handleSkillChange("subcategory", e.target.value)
                    }
                    disabled={!currentSkill.category}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:bg-gray-100"
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
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-pink-600">
                  Description
                </label>
                <textarea
                  value={currentSkill.description}
                  onChange={(e) =>
                    handleSkillChange("description", e.target.value)
                  }
                  placeholder="Describe your skill and experience..."
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Upload Image */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-600">
                    Upload Image
                  </label>
                  <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-pink-300 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                    <Upload className="w-5 h-5 text-pink-500" />
                    <span className="text-sm text-pink-600">Choose Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files[0] &&
                        handleFileUpload("image", e.target.files[0])
                      }
                    />
                  </label>
                </div>

                {/* Visibility */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-pink-600 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Visibility
                  </label>
                  <select
                    value={currentSkill.visibility}
                    onChange={(e) =>
                      handleSkillChange("visibility", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    {visibilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Skill & Cancel Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAddSkills(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  disabled={loading}
                  className="flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {loading ? "Adding..." : "Add Skill"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
>>>>>>> 513c47f2d72d0b9cf95e5dadb5feb1e46f4ce03a
    </div>
  );
}

export default PostSkill;
