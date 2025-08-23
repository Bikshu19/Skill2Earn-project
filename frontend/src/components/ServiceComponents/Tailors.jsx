import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Eye,
  MessageCircle,
  Search,
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
  const [currentUser] = useState({ id: 1 });

  // Mock data: 10 items total — first 6 are public, last 4 are private (premium)
  const fetchTailoringSkills = async () => {
    try {
      setLoading(true);

      const mockTailoringData = [
        {
          id: 1,
          title: "Custom Dress Designer",
          description:
            "Creates bespoke dresses tailored to your style and measurements.",
          image:
            "https://images.unsplash.com/photo-1600185361597-4c4c1f8c1fa0?w=600&h=400&fit=crop",
          username: "Priya Sharma",
          address: "Delhi, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-03-10",
          likes: 180,
          isLiked: false,
          views: 350,
          comments: 28,
          rating: 4.8,
          experience: "6 years",
          specialties: ["Evening Gowns", "Party Dresses", "Wedding Dresses"],
          isPublic: true,
        },
        {
          id: 2,
          title: "Blouse Stitching Expert",
          description:
            "Specializes in custom blouse designs and traditional stitching.",
          image:
            "https://images.unsplash.com/photo-1591012911200-c73b80285d6c?w=600&h=400&fit=crop",
          username: "Ananya Verma",
          address: "Mumbai, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-03-08",
          likes: 150,
          isLiked: true,
          views: 300,
          comments: 20,
          rating: 4.7,
          experience: "5 years",
          specialties: ["Blouses", "Lehengas", "Saree Blouse Design"],
          isPublic: true,
        },
        {
          id: 3,
          title: "Kids Wear Designer",
          description:
            "Designs comfortable and stylish clothing for children of all ages.",
          image:
            "https://images.unsplash.com/photo-1611599532232-69d5f231a342?w=600&h=400&fit=crop",
          username: "Ritika Jain",
          address: "Bangalore, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-03-05",
          likes: 140,
          isLiked: false,
          views: 270,
          comments: 18,
          rating: 4.6,
          experience: "4 years",
          specialties: ["Kids Dresses", "Casual Wear", "Party Wear"],
          isPublic: true,
        },
        {
          id: 4,
          title: "Casual Wear Specialist",
          description:
            "Expert in stitching and designing casual outfits for daily wear.",
          image:
            "https://images.unsplash.com/photo-1610426613092-7d758f06bfe7?w=600&h=400&fit=crop",
          username: "Sneha Kapoor",
          address: "Pune, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-03-02",
          likes: 130,
          isLiked: false,
          views: 250,
          comments: 15,
          rating: 4.5,
          experience: "3 years",
          specialties: ["Shirts", "Trousers", "Casual Sets"],
          isPublic: true,
        },
        {
          id: 5,
          title: "Ethnic Wear Tailor",
          description:
            "Specializes in stitching ethnic outfits like sarees, kurtas, and lehengas.",
          image:
            "https://images.unsplash.com/photo-1590608897129-79b81d5df1f3?w=600&h=400&fit=crop",
          username: "Kavita Reddy",
          address: "Hyderabad, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-28",
          likes: 170,
          isLiked: true,
          views: 330,
          comments: 22,
          rating: 4.7,
          experience: "7 years",
          specialties: ["Sarees", "Kurtis", "Lehengas"],
          isPublic: true,
        },
        {
          id: 6,
          title: "Luxury Tailoring Expert",
          description:
            "Provides premium tailoring services for weddings and events.",
          image:
            "https://images.unsplash.com/photo-1603031767641-42df2a17b0f1?w=600&h=400&fit=crop",
          username: "Arjun Malhotra",
          address: "Chennai, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-25",
          likes: 200,
          isLiked: false,
          views: 400,
          comments: 30,
          rating: 4.9,
          experience: "10 years",
          specialties: ["Wedding Dresses", "Custom Gowns", "Luxury Outfits"],
          isPublic: true,
        },

        // PRIVATE / PREMIUM (4)
        {
          id: 7,
          title: "Designer Couture Specialist",
          description:
            "Crafts high-end couture dresses and exclusive designer wear.",
          image:
            "https://images.unsplash.com/photo-1618220511955-fbcd9c44d76?w=600&h=400&fit=crop",
          username: "Sonia Kapoor",
          address: "Goa, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-20",
          likes: 220,
          isLiked: true,
          views: 450,
          comments: 40,
          rating: 5.0,
          experience: "12 years",
          specialties: ["Couture Dresses", "Designer Wear", "Luxury Tailoring"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 8,
          title: "Bridal Wear Expert",
          description:
            "Designs and stitches exclusive bridal outfits with perfect fit.",
          image:
            "https://images.unsplash.com/photo-1595526114035-0d45e7abf0c6?w=600&h=400&fit=crop",
          username: "Neha Jain",
          address: "Jaipur, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-18",
          likes: 210,
          isLiked: true,
          views: 430,
          comments: 38,
          rating: 4.9,
          experience: "11 years",
          specialties: ["Bridal Lehengas", "Custom Sarees", "Luxury Dresses"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 9,
          title: "Men's Formal Wear Tailor",
          description:
            "Specializes in tailored suits, shirts, and formal menswear.",
          image:
            "https://images.unsplash.com/photo-1600607689863-1c3d04f43e3f?w=600&h=400&fit=crop",
          username: "Ramesh Patel",
          address: "Ahmedabad, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-15",
          likes: 180,
          isLiked: false,
          views: 390,
          comments: 25,
          rating: 4.8,
          experience: "9 years",
          specialties: ["Suits", "Shirts", "Formal Wear"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 10,
          title: "Celebrity Costume Designer",
          description:
            "Designs exclusive costumes for film, theatre, and celebrity clients.",
          image:
            "https://images.unsplash.com/photo-1600585154340-1c3d04f43e3f?w=600&h=400&fit=crop",
          username: "Vikram Rao",
          address: "Mumbai, India",
          category: "Tailoring / Stitching",
          createdAt: "2024-02-12",
          likes: 195,
          isLiked: true,
          views: 420,
          comments: 32,
          rating: 4.9,
          experience: "10 years",
          specialties: ["Film Costumes", "Celebrity Outfits", "Custom Designs"],
          isPremium: true,
          isPublic: false,
        },
      ];
      // Set all skills; show only public (first 6) initially
      setTimeout(() => {
        setSkills(mockTailoringData);
        const publicSkills = mockTailoringData.filter((s) => s.isPublic);
        setDisplayedSkills(publicSkills.slice(0, 6));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setLoading(false);
    }
  };

  const toggleLike = async (skillId) => {
    try {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === skillId
            ? {
                ...skill,
                isLiked: !skill.isLiked,
                likes: skill.isLiked ? skill.likes - 1 : skill.likes + 1,
              }
            : skill
        )
      );

      setDisplayedSkills((prev) =>
        prev.map((skill) =>
          skill.id === skillId
            ? {
                ...skill,
                isLiked: !skill.isLiked,
                likes: skill.isLiked ? skill.likes - 1 : skill.likes + 1,
              }
            : skill
        )
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
      setDisplayedSkills(skills); // show all (public + private)
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowMore(true);
    setDisplayedSkills(skills); // after login show all
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-pink-100/60 to-purple-100/70 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-96 h-64 bg-pink-200/50 rounded-3xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-pink-200/60 rounded w-3/4"></div>
                  <div className="h-4 bg-pink-200/40 rounded"></div>
                  <div className="h-4 bg-pink-200/40 rounded w-5/6"></div>
                  <div className="flex gap-4 mt-6">
                    <div className="w-12 h-12 bg-pink-200/60 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-pink-200/50 rounded w-32"></div>
                      <div className="h-3 bg-pink-200/40 rounded w-24"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-pink-100/60 to-purple-100/70 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#1F2937]">
            Master <span className="text-[#DB2777]">Women</span> Tailors
          </h1>
          <p className="text-xl text-[#374151] max-w-2xl mx-auto leading-relaxed mb-8">
            Discover skilled <span className="text-[#DB2777]">Tailors</span> for
            all your custom requirement needs
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#DB2777]" />
            </div>
            <input
              type="text"
              placeholder="Search tailors, specialties, locations..."
              className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-600 focus:bg-white transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">
                {skills.length}+
              </div>
              <div className="text-[#374151]">Expertise Tailors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">50+</div>
              <div className="text-[#374151]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">10+</div>
              <div className="text-[#374151]">New Designs</div>
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
                    <div className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl backdrop-blur-sm">
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
                            ? "bg-pink-600/80 text-white"
                            : "bg-white/20 text-white hover:bg-pink-600/60"
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
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] leading-tight">
                    {skill.title}
                  </h2>
                  <p className="text-lg text-[#374151] leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {skill.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tailor Info */}
                <div className="flex items-center gap-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-pink-200/50 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Scissors className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      {skill.username}
                    </h3>
                    <div className="flex items-center gap-2 text-pink-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {skill.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#374151]">
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
                  <button className="px-6 py-4 border border-pink-600 text-pink-600 rounded-xl font-semibold transition-all duration-300 hover:bg-pink-50 transform hover:scale-105">
                    View Profile
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
              className="bg-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-pink-700 transform hover:scale-110 shadow-2xl flex items-center gap-3 mx-auto"
            >
              <Users className="w-5 h-5" />
              {isLoggedIn ? (
                "Show More Tailors"
              ) : (
                <a href="/login">"Login to See More Premium Tailors"</a>
              )}
            </button>
          </div>
        )}
      </div>

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
