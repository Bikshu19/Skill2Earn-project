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
  title: "Data Entry Specialist",
  description:
    "Fast and accurate data entry expert with over 12 years of experience. Skilled in MS Excel, Google Sheets, and database management for businesses and startups.",
  image:
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop",
  username: "Ravi Kumar",
  address: "Delhi, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-20",
  likes: 95,
  isLiked: false,
  views: 220,
  comments: 17,
  rating: 4.9,
  experience: "12 years",
  specialties: ["Data Entry", "Excel", "Database Management"],
},
{
  id: 2,
  title: "Freelance Content Writer",
  description:
    "Creative freelance writer specializing in blogs, website content, and SEO-friendly articles. Helping brands tell their story with impactful words.",
  image:
    "https://images.unsplash.com/photo-1504691342899-4d92b50853e8?w=600&h=400&fit=crop",
  username: "Ayesha Khan",
  address: "Mumbai, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-18",
  likes: 78,
  isLiked: true,
  views: 190,
  comments: 22,
  rating: 4.8,
  experience: "8 years",
  specialties: ["Blog Writing", "SEO Articles", "Website Content"],
},
{
  id: 3,
  title: "Virtual Assistant",
  description:
    "Efficient virtual assistant managing schedules, emails, and client communication. Trusted by entrepreneurs for productivity and smooth operations.",
  image:
    "https://images.unsplash.com/photo-1584697964403-9e98f0cf3440?w=600&h=400&fit=crop",
  username: "Neha Sharma",
  address: "Bangalore, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-15",
  likes: 132,
  isLiked: false,
  views: 350,
  comments: 40,
  rating: 4.9,
  experience: "10 years",
  specialties: ["Virtual Assistance", "Email Handling", "Scheduling"],
},
{
  id: 4,
  title: "Social Media Manager",
  description:
    "Managing Instagram, Facebook, and LinkedIn accounts for small businesses. Specialized in increasing engagement and running ad campaigns.",
  image:
    "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop",
  username: "Arjun Mehta",
  address: "Hyderabad, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-12",
  likes: 88,
  isLiked: false,
  views: 210,
  comments: 19,
  rating: 4.7,
  experience: "7 years",
  specialties: ["Instagram Marketing", "Ad Campaigns", "Engagement Growth"],
},
{
  id: 5,
  title: "Freelance Graphic Designer",
  description:
    "Passionate graphic designer creating logos, brand kits, and social media creatives. Worked with 200+ small businesses worldwide.",
  image:
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=400&fit=crop",
  username: "Simran Kaur",
  address: "Chandigarh, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-10",
  likes: 103,
  isLiked: false,
  views: 260,
  comments: 29,
  rating: 4.8,
  experience: "9 years",
  specialties: ["Logo Design", "Social Media Creatives", "Branding"],
},
{
  id: 6,
  title: "Freelance Copywriter",
  description:
    "Expert in writing persuasive ad copies, sales pages, and product descriptions that drive conversions and sales.",
  image:
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600&h=400&fit=crop",
  username: "Mohit Verma",
  address: "Chennai, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-08",
  likes: 64,
  isLiked: true,
  views: 150,
  comments: 14,
  rating: 4.8,
  experience: "6 years",
  specialties: ["Copywriting", "Ad Copy", "Product Descriptions"],
},
// PREMIUM CONTENT
{
  id: 7,
  title: "SEO & Digital Marketing Expert",
  description:
    "Helping startups grow online with SEO optimization, keyword research, and marketing strategies. Increased organic traffic by 300% for clients.",
  image:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
  username: "Rahul Jain",
  address: "Gurgaon, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-05",
  likes: 154,
  isLiked: false,
  views: 420,
  comments: 55,
  rating: 5.0,
  experience: "11 years",
  specialties: ["SEO", "Digital Marketing", "Keyword Research"],
  isPremium: true,
},
{
  id: 8,
  title: "Freelance Video Editor",
  description:
    "Skilled video editor for YouTube, Instagram reels, and ads. Delivering engaging videos with modern editing techniques.",
  image:
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop",
  username: "Ananya Das",
  address: "Kolkata, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-03",
  likes: 112,
  isLiked: false,
  views: 300,
  comments: 38,
  rating: 4.9,
  experience: "8 years",
  specialties: ["Video Editing", "YouTube Videos", "Reels"],
  isPremium: true,
},
{
  id: 9,
  title: "UI/UX Designer (Freelance)",
  description:
    "Designing beautiful and user-friendly websites and apps. Focused on wireframes, mockups, and prototypes for startups and businesses.",
  image:
    "https://images.unsplash.com/photo-1559027615-ce3c1ca5d995?w=600&h=400&fit=crop",
  username: "Ishita Roy",
  address: "Pune, India",
  category: "Remote Work / Freelancing",
  createdAt: "2024-01-01",
  likes: 97,
  isLiked: true,
  views: 200,
  comments: 27,
  rating: 4.8,
  experience: "9 years",
  specialties: ["UI/UX Design", "Prototypes", "Wireframes"],
  isPremium: true,
},
{
  id: 10,
  title: "Freelance Translator",
  description:
    "Professional translator fluent in English, Hindi, and French. Offering document translation, subtitles, and business communication services.",
  image:
    "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=600&h=400&fit=crop",
  username: "Pooja Nair",
  address: "Kerala, India",
  category: "Remote Work / Freelancing",
  createdAt: "2023-12-28",
  likes: 121,
  isLiked: false,
  views: 275,
  comments: 33,
  rating: 4.9,
  experience: "14 years",
  specialties: ["Translation", "Subtitles", "Business Communication"],
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


