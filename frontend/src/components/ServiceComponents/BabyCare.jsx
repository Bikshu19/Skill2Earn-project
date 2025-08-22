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
  title: "Experienced Babysitter & Nanny",
  description:
    "Caring babysitter with 10+ years of experience in child care. Provides safe, nurturing, and fun environment for kids at home.",
  image:
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=400&fit=crop",
  username: "Suman Sharma",
  address: "Delhi, India",
  category: "Baby Care",
  createdAt: "2024-01-20",
  likes: 102,
  isLiked: false,
  views: 289,
  comments: 34,
  rating: 4.9,
  experience: "10 years",
  specialties: ["Newborn Care", "Toddler Activities", "Full-day Babysitting"],
},
{
  id: 2,
  title: "Part-Time Babysitting Specialist",
  description:
    "Available for after-school babysitting and evening care. Engages kids with creative activities and helps with homework.",
  image:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
  username: "Ravi Verma",
  address: "Mumbai, India",
  category: "Baby Care",
  createdAt: "2024-01-18",
  likes: 76,
  isLiked: true,
  views: 178,
  comments: 21,
  rating: 4.7,
  experience: "6 years",
  specialties: ["Homework Help", "Evening Care", "Indoor Games"],
},
{
  id: 3,
  title: "Infant & Toddler Caregiver",
  description:
    "Specialist in newborn and toddler care with medical knowledge. Provides feeding support, sleep training, and gentle handling.",
  image:
    "https://images.unsplash.com/photo-1520719779912-49b2b0e1aa06?w=600&h=400&fit=crop",
  username: "Priya Nair",
  address: "Bangalore, India",
  category: "Baby Care",
  createdAt: "2024-01-15",
  likes: 134,
  isLiked: false,
  views: 342,
  comments: 47,
  rating: 5.0,
  experience: "12 years",
  specialties: ["Infant Care", "Feeding & Bathing", "Sleep Training"],
},
{
  id: 4,
  title: "Weekend Babysitting Services",
  description:
    "Trusted babysitter available on weekends for working parents. Ensures kids are safe, happy, and entertained.",
  image:
    "https://images.unsplash.com/photo-1503457574464-4e37c8c1d4a5?w=600&h=400&fit=crop",
  username: "Anjali Gupta",
  address: "Hyderabad, India",
  category: "Baby Care",
  createdAt: "2024-01-12",
  likes: 58,
  isLiked: false,
  views: 147,
  comments: 18,
  rating: 4.6,
  experience: "5 years",
  specialties: ["Weekend Care", "Playtime", "Storytelling"],
},
{
  id: 5,
  title: "Home-based Babysitter",
  description:
    "Provides baby care at own residence with safe environment. Small group of kids with personalized attention.",
  image:
    "https://images.unsplash.com/photo-1503457574464-4e37c8c1d4a5?w=600&h=400&fit=crop",
  username: "Mohammed Ali",
  address: "Pune, India",
  category: "Baby Care",
  createdAt: "2024-01-10",
  likes: 65,
  isLiked: false,
  views: 190,
  comments: 22,
  rating: 4.8,
  experience: "7 years",
  specialties: ["Group Play", "Safe Home Environment", "Day Care"],
},
{
  id: 6,
  title: "Certified Babysitter & Child Educator",
  description:
    "Certified in child care and early education. Focuses on both safety and developmental activities for kids.",
  image:
    "https://images.unsplash.com/photo-1600880292089-90e9b4e3e320?w=600&h=400&fit=crop",
  username: "Neha Singh",
  address: "Chennai, India",
  category: "Baby Care",
  createdAt: "2024-01-08",
  likes: 88,
  isLiked: true,
  views: 210,
  comments: 27,
  rating: 4.9,
  experience: "9 years",
  specialties: ["Early Learning", "Creative Activities", "Certified Care"],
},
// PREMIUM CONTENT - Requires Login
{
  id: 7,
  title: "Luxury Nanny Services",
  description:
    "Exclusive nanny service for high-profile families. Premium baby care with personalized attention and flexible hours.",
  image:
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
  username: "Kavya Reddy",
  address: "Gurgaon, India",
  category: "Baby Care",
  createdAt: "2024-01-05",
  likes: 165,
  isLiked: false,
  views: 431,
  comments: 63,
  rating: 5.0,
  experience: "15 years",
  specialties: ["Exclusive Nanny", "Luxury Families", "Personalized Care"],
  isPremium: true,
},
{
  id: 8,
  title: "Montessori Trained Babysitter",
  description:
    "Blending babysitting with early childhood education using Montessori techniques. Ideal for toddlers and preschool kids.",
  image:
    "https://images.unsplash.com/photo-1616628182504-9d7a3c1a0d24?w=600&h=400&fit=crop",
  username: "Ravi Mehta",
  address: "Jaipur, India",
  category: "Baby Care",
  createdAt: "2024-01-03",
  likes: 92,
  isLiked: false,
  views: 238,
  comments: 33,
  rating: 4.9,
  experience: "11 years",
  specialties: ["Montessori Activities", "Learning Games", "Toddler Care"],
  isPremium: true,
},
{
  id: 9,
  title: "Cultural Events Babysitting",
  description:
    "Providing babysitting during weddings, functions, and cultural events. Keeps children engaged while parents are busy.",
  image:
    "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&h=400&fit=crop",
  username: "Sunita Joshi",
  address: "Kolkata, India",
  category: "Baby Care",
  createdAt: "2024-01-01",
  likes: 74,
  isLiked: true,
  views: 154,
  comments: 26,
  rating: 4.8,
  experience: "14 years",
  specialties: ["Event Babysitting", "Group Care", "Engagement Activities"],
  isPremium: true,
},
{
  id: 10,
  title: "Special Needs Child Caregiver",
  description:
    "Trained babysitter for children with special needs. Focused on safety, comfort, and personalized support.",
  image:
    "https://images.unsplash.com/photo-1600880292089-90e9b4e3e320?w=600&h=400&fit=crop",
  username: "Deepa Nair",
  address: "Kochi, India",
  category: "Baby Care",
  createdAt: "2023-12-28",
  likes: 139,
  isLiked: false,
  views: 301,
  comments: 49,
  rating: 4.9,
  experience: "13 years",
  specialties: ["Special Needs Care", "One-on-One Support", "Safe Handling"],
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


