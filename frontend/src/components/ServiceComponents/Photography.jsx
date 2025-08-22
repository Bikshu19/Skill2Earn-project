import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  User,
  Calendar,
  Eye,
  MessageCircle,
  Search,
  Filter,
  Star,
  Scissors,
  Users,
  Clock,
} from "lucide-react";

const TailoringSkillsDisplay = () => {
  const [skills, setSkills] = useState([]);
  const [displayedSkills, setDisplayedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: 1 });

  // Mock tailoring data - replace with actual API calls
  const fetchTailoringSkills = async () => {
    try {
      setLoading(true);

      // FOR PRODUCTION: Replace with actual API call
      /*
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/tailoring-skills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      setSkills(data);
      */

      // DEMO DATA - 10 tailoring professionals
      const mockTailoringData = [
  {
    id: 1,
    title: "Wedding & Candid Photographer",
    description:
      "Capturing weddings with a mix of candid and traditional styles. Known for storytelling through vibrant photographs.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop",
    username: "Arjun Mehta",
    address: "Mumbai, India",
    category: "Wedding Photography",
    createdAt: "2024-02-10",
    likes: 120,
    isLiked: false,
    views: 340,
    comments: 45,
    rating: 4.8,
    experience: "10 years",
    specialties: ["Weddings", "Candid Photography", "Couple Shoots"],
  },
  {
    id: 2,
    title: "Event & Corporate Photographer",
    description:
      "Specialist in covering large corporate events, conferences, and family gatherings with professional quality.",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=600&h=400&fit=crop",
    username: "Sneha Kapoor",
    address: "Bengaluru, India",
    category: "Event Photography",
    createdAt: "2024-03-05",
    likes: 98,
    isLiked: false,
    views: 280,
    comments: 30,
    rating: 4.7,
    experience: "7 years",
    specialties: ["Corporate Events", "Conferences", "Birthday Parties"],
  },
  {
    id: 3,
    title: "Fashion & Portfolio Photographer",
    description:
      "Creating bold, stylish, and modern fashion portfolios for models and influencers.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4f08c1f01f98?w=600&h=400&fit=crop",
    username: "Rahul Verma",
    address: "Delhi, India",
    category: "Fashion Photography",
    createdAt: "2024-04-15",
    likes: 150,
    isLiked: false,
    views: 500,
    comments: 65,
    rating: 4.9,
    experience: "12 years",
    specialties: ["Fashion Shoots", "Portfolio Creation", "Editorial"],
  },
  {
    id: 4,
    title: "Nature & Wildlife Photographer",
    description:
      "Passionate about capturing the beauty of wildlife and landscapes with patience and precision.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
    username: "Ananya Singh",
    address: "Jaipur, India",
    category: "Wildlife Photography",
    createdAt: "2024-05-01",
    likes: 210,
    isLiked: false,
    views: 620,
    comments: 80,
    rating: 5.0,
    experience: "8 years",
    specialties: ["Wildlife", "Birds", "Landscapes"],
  },
  {
    id: 5,
    title: "Maternity & Baby Photographer",
    description:
      "Capturing the precious moments of motherhood and baby milestones with soft, warm tones.",
    image:
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=600&h=400&fit=crop",
    username: "Neha Agarwal",
    address: "Hyderabad, India",
    category: "Baby Photography",
    createdAt: "2024-06-12",
    likes: 135,
    isLiked: false,
    views: 410,
    comments: 55,
    rating: 4.8,
    experience: "6 years",
    specialties: ["Maternity", "Newborn Shoots", "Family Portraits"],
  },
  {
    id: 6,
    title: "Travel & Street Photographer",
    description:
      "Exploring cultures and cities, capturing everyday stories and vibrant travel moments.",
    image:
      "https://images.unsplash.com/photo-1520975922071-a43cf6c324b3?w=600&h=400&fit=crop",
    username: "Vikram Joshi",
    address: "Kolkata, India",
    category: "Street & Travel Photography",
    createdAt: "2024-07-03",
    likes: 175,
    isLiked: false,
    views: 560,
    comments: 60,
    rating: 4.9,
    experience: "9 years",
    specialties: ["Street Photography", "Travel Stories", "Documentary"],
  },

  // PREMIUM CONTENT - Requires Login
  {
    id: 7,
    title: "Luxury Wedding Photographer",
    description:
      "Specialized in high-end luxury weddings with cinematic videography and editorial-style portraits.",
    image:
      "https://images.unsplash.com/photo-1519744346363-dc563d017327?w=600&h=400&fit=crop",
    username: "Kavya Reddy",
    address: "Gurgaon, India",
    category: "Luxury Weddings",
    createdAt: "2024-08-05",
    likes: 250,
    isLiked: false,
    views: 780,
    comments: 90,
    rating: 5.0,
    experience: "15 years",
    specialties: ["Luxury Weddings", "Destination Shoots", "Editorial"],
    isPremium: true,
  },
  {
    id: 8,
    title: "Destination Photographer",
    description:
      "Traveling worldwide for weddings, honeymoons, and special events. Blending landscapes with love stories.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=400&fit=crop",
    username: "Ravi Mehta",
    address: "Jaipur, India",
    category: "Destination Photography",
    createdAt: "2024-09-10",
    likes: 180,
    isLiked: false,
    views: 500,
    comments: 50,
    rating: 4.9,
    experience: "11 years",
    specialties: ["Destination Shoots", "Couple Travel", "Adventure"],
    isPremium: true,
  },
  {
    id: 9,
    title: "Fine Art Photographer",
    description:
      "Creating conceptual and artistic photography pieces for exhibitions, magazines, and creative clients.",
    image:
      "https://images.unsplash.com/photo-1510414696678-2415ad8474aa?w=600&h=400&fit=crop",
    username: "Sunita Joshi",
    address: "Kolkata, India",
    category: "Fine Art",
    createdAt: "2024-10-01",
    likes: 110,
    isLiked: true,
    views: 300,
    comments: 40,
    rating: 4.8,
    experience: "14 years",
    specialties: ["Conceptual Art", "Exhibitions", "Magazine Work"],
    isPremium: true,
  },
  {
    id: 10,
    title: "Commercial Product Photographer",
    description:
      "Professional product and advertising photographer for e-commerce, branding, and creative campaigns.",
    image:
      "https://images.unsplash.com/photo-1616627988854-7e5e853ee1bc?w=600&h=400&fit=crop",
    username: "Deepa Nair",
    address: "Kochi, India",
    category: "Commercial Photography",
    createdAt: "2024-11-15",
    likes: 140,
    isLiked: false,
    views: 420,
    comments: 55,
    rating: 4.9,
    experience: "13 years",
    specialties: ["Products", "Advertising", "E-commerce"],
    isPremium: true,
  },
];

      setTimeout(() => {
        setSkills(mockTailoringData);
        setDisplayedSkills(mockTailoringData.slice(0, 6)); // Show first 6
        setLoading(false);
      }, 1200);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setLoading(false);
    }
  };

  const toggleLike = async (skillId) => {
    try {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              isLiked: !skill.isLiked,
              likes: skill.isLiked ? skill.likes - 1 : skill.likes + 1,
            };
          }
          return skill;
        })
      );

      setDisplayedSkills((prevSkills) =>
        prevSkills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              isLiked: !skill.isLiked,
              likes: skill.isLiked ? skill.likes - 1 : skill.likes + 1,
            };
          }
          return skill;
        })
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShowMore = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowMore(true);
      setDisplayedSkills(skills); // Show all skills
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowMore(true);
    setDisplayedSkills(skills); // Show all skills after login
  };

  const filteredSkills = displayedSkills.filter(
    (skill) =>
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTailoringSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-96 h-64 bg-purple-200/50 rounded-3xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-purple-200/60 rounded w-3/4"></div>
                  <div className="h-4 bg-purple-200/40 rounded"></div>
                  <div className="h-4 bg-purple-200/40 rounded w-5/6"></div>
                  <div className="flex gap-4 mt-6">
                    <div className="w-12 h-12 bg-purple-200/60 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-purple-200/50 rounded w-32"></div>
                      <div className="h-3 bg-purple-200/40 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-800">
            Master <span className="text-purple-600">Tailors</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover skilled{" "}
            <span className="text-purple-600">tailoring professionals</span> for
            all your custom clothing needs
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search tailors, specialties, locations..."
              className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {skills.length}+
              </div>
              <div className="text-gray-600">Expert Tailors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-gray-600">Specialties</div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto space-y-16">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className={`flex flex-col lg:flex-row gap-12 items-center animate-slide-up ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative overflow-hidden rounded-3xl transform transition-all duration-700 hover:scale-105">
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Premium Badge */}
                  {skill.isPremium && (
                    <div className="absolute top-6 left-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl backdrop-blur-sm flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        Premium
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl backdrop-blur-sm">
                      {skill.category}
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(skill.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
                          skill.isLiked
                            ? "bg-purple-600/80 text-white"
                            : "bg-white/20 text-white hover:bg-purple-600/60"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 transition-all duration-300 ${
                            skill.isLiked ? "fill-current" : ""
                          }`}
                        />
                        <span className="font-semibold">{skill.likes}</span>
                      </button>

                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">
                        <Eye className="w-5 h-5" />
                        <span className="font-semibold">{skill.views}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full text-white">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {skill.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    {skill.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {skill.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tailor Info */}
                <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-purple-200/50 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Scissors className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {skill.username}
                    </h3>
                    <div className="flex items-center gap-2 text-purple-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {skill.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {skill.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {skill.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 shadow-xl">
                    Book Consultation
                  </button>
                  <button className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold transition-all duration-300 hover:bg-purple-600 hover:text-white transform hover:scale-105">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Login Button */}
        {!showMore && displayedSkills.length < skills.length && (
          <div className="text-center mt-20">
            <button
              onClick={handleShowMore}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-purple-700 transform hover:scale-110 shadow-2xl flex items-center gap-3 mx-auto"
            >
              <Users className="w-5 h-5" />
              {isLoggedIn
                ? "Show More Tailors"
                : "Login to See More Premium Tailors"}
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-up">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Login Required
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Login to view all premium tailoring professionals and their
              exclusive services.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r pink-50 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-purple-600 hover:to-purple-700"
              >
                Login & Continue
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TailoringSkillsDisplay;


