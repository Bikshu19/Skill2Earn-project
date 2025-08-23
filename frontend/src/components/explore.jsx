import React, { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Briefcase,
  Image,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

function UsersWithWorks() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsersWithWorks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/users-with-works", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch users: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Fetched data:", data); // For debugging

      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && data.users && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (e) {
      console.error("Error fetching users:", e);
      setError(e.message || "Failed to load users from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWithWorks();
  }, []);

  const handleRefresh = () => {
    fetchUsersWithWorks();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-pink-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-pink-200 rounded-full animate-ping mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading from Database
          </h3>
          <p className="text-gray-600">Fetching latest user portfolios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200 max-w-md mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Database Connection Error
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-600 mb-4">
            No users with uploaded works found in database.
          </p>
          <button
            onClick={handleRefresh}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Creative Professionals
            </h1>
            <button
              onClick={handleRefresh}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-pink-50 group"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-pink-600 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover talented individuals and their amazing portfolio of works -
            Live from Database
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {users.map((user, userIndex) => (
            <div
              key={user._id || user.id || userIndex}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-100 hover:border-pink-300 transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${userIndex * 0.2}s both`,
              }}
            >
              {/* User Header */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">
                      {user.username || "Unknown User"}
                    </h2>
                    <div className="flex items-center space-x-2 text-pink-100">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">
                        {user.email || "No email provided"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                {(user.address || user.location || user.pincode) && (
                  <div className="mt-4 flex items-center space-x-2 text-pink-100">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {[user.address, user.location, user.pincode]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Works Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-pink-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Portfolio ({user.works?.length || 0}{" "}
                      {(user.works?.length || 0) === 1 ? "Work" : "Works"})
                    </h3>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    ID: {user._id || user.id || "N/A"}
                  </div>
                </div>

                {!user.works || user.works.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No works uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.works.map((work, workIndex) => (
                      <div
                        key={workIndex}
                        className="group/work bg-gradient-to-r from-gray-50 to-pink-50 rounded-2xl p-5 hover:from-pink-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-pink-200"
                        style={{
                          animation: `slideInLeft 0.5s ease-out ${
                            workIndex * 0.1 + 0.3
                          }s both`,
                        }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                          {/* Work Image */}
                          {work.image &&
                            work.image.length > 0 &&
                            work.image[0] && (
                              <div className="flex-shrink-0">
                                <div className="w-32 h-32 lg:w-24 lg:h-24 rounded-xl overflow-hidden shadow-lg group-hover/work:shadow-xl transition-shadow duration-300">
                                  <img
                                    src={work.image[0]}
                                    alt={`${work.category || "Work"} image`}
                                    className="w-full h-full object-cover group-hover/work:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                                      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="200" fill="#f3f4f6"/>
                                        <text x="100" y="100" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy="0.3em">No Image</text>
                                      </svg>
                                    `)}`;
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                          {/* Work Details */}
                          <div className="flex-1">
                            <div className="flex flex-col space-y-3">
                              <div>
                                <span className="inline-block bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                                  {work.category || "Uncategorized"}
                                </span>
                                <h4 className="text-lg font-semibold text-gray-800 group-hover/work:text-pink-600 transition-colors duration-300">
                                  {work.subcategory ||
                                    "No subcategory specified"}
                                </h4>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span>From Database</span>
                                </div>
                                {work.image && work.image.length > 1 && (
                                  <span className="text-xs text-pink-600 font-medium">
                                    +{work.image.length - 1} more images
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UsersWithWorks;
