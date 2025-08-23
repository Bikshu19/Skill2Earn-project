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
          title: "Handmade Organic Soaps",
          description:
            "Chemical-free soaps crafted with aloe vera, neem, and natural oils for healthy skin.",
          image:
            "https://images.unsplash.com/photo-1611080626918-bfd42fce9f23?w=600&h=400&fit=crop",
          username: "Priya Sharma",
          address: "Delhi, India",
          category: "Personal Care",
          createdAt: "2024-02-12",
          likes: 220,
          isLiked: false,
          views: 480,
          comments: 42,
          rating: 4.9,
          experience: "5 years",
          specialties: ["Aloe Vera Soap", "Neem Soap", "Lavender Soap"],
          isPublic: true,
        },
        {
          id: 2,
          title: "Homemade Scented Candles",
          description:
            "Eco-friendly soy wax candles with relaxing fragrances for homes.",
          image:
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=600&h=400&fit=crop",
          username: "Ritika Mehta",
          address: "Pune, India",
          category: "Home Decor",
          createdAt: "2024-02-08",
          likes: 175,
          isLiked: true,
          views: 360,
          comments: 30,
          rating: 4.7,
          experience: "3 years",
          specialties: ["Vanilla Candle", "Rose Candle", "Lemongrass Candle"],
          isPublic: true,
        },
        {
          id: 3,
          title: "Handmade Cotton Bags",
          description:
            "Durable, eco-friendly cotton tote bags with hand-painted designs.",
          image:
            "https://images.unsplash.com/photo-1617196038434-fd0e29af9da2?w=600&h=400&fit=crop",
          username: "Anjali Gupta",
          address: "Jaipur, India",
          category: "Accessories",
          createdAt: "2024-02-05",
          likes: 190,
          isLiked: false,
          views: 410,
          comments: 36,
          rating: 4.8,
          experience: "6 years",
          specialties: ["Cotton Tote Bags", "Hand-Painted Bags", "Eco Bags"],
          isPublic: true,
        },
        {
          id: 4,
          title: "Homemade Chocolates",
          description:
            "Delicious handmade chocolates with dry fruits, caramel, and pure cocoa.",
          image:
            "https://images.unsplash.com/photo-1606313564200-e75e9ceae1b2?w=600&h=400&fit=crop",
          username: "Arjun Reddy",
          address: "Mumbai, India",
          category: "Food",
          createdAt: "2024-02-02",
          likes: 240,
          isLiked: false,
          views: 520,
          comments: 55,
          rating: 5.0,
          experience: "7 years",
          specialties: ["Dark Chocolate", "Fruit & Nut", "Caramel Chocolate"],
          isPublic: true,
        },
        {
          id: 5,
          title: "Handcrafted Jewelry",
          description:
            "Beautiful terracotta and beaded jewelry pieces made with love.",
          image:
            "https://images.unsplash.com/photo-1625643503071-1cbf299ec52f?w=600&h=400&fit=crop",
          username: "Aditi Singh",
          address: "Kolkata, India",
          category: "Jewelry",
          createdAt: "2024-01-28",
          likes: 160,
          isLiked: true,
          views: 300,
          comments: 27,
          rating: 4.6,
          experience: "4 years",
          specialties: [
            "Terracotta Earrings",
            "Beaded Necklaces",
            "Clay Jewelry",
          ],
          isPublic: true,
        },
        {
          id: 6,
          title: "Homemade Fruit Jams",
          description:
            "Preservative-free strawberry, mango, and guava jams made fresh.",
          image:
            "https://images.unsplash.com/photo-1625940953630-24b3a9089c9c?w=600&h=400&fit=crop",
          username: "Sumanth Rao",
          address: "Bangalore, India",
          category: "Food",
          createdAt: "2024-01-25",
          likes: 210,
          isLiked: false,
          views: 440,
          comments: 48,
          rating: 4.9,
          experience: "10 years",
          specialties: ["Strawberry Jam", "Mango Jam", "Guava Jam"],
          isPublic: true,
        },
        // PRIVATE / PREMIUM (4)
        {
          id: 7,
          title: "Luxury Crochet Toys",
          description:
            "Handmade crochet dolls and stuffed toys for kids using premium cotton yarn.",
          image:
            "https://images.unsplash.com/photo-1625643720897-6e5c22151f8e?w=600&h=400&fit=crop",
          username: "Pooja Mehta",
          address: "Ahmedabad, India",
          category: "Toys",
          createdAt: "2024-01-20",
          likes: 150,
          isLiked: false,
          views: 390,
          comments: 32,
          rating: 4.8,
          experience: "7 years",
          specialties: ["Crochet Dolls", "Stuffed Animals", "Baby Toys"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 8,
          title: "Designer Handwoven Bags",
          description:
            "Premium handwoven jute and cane bags with unique modern designs.",
          image:
            "https://images.unsplash.com/photo-1624387625819-21e90e9e6a94?w=600&h=400&fit=crop",
          username: "Rohini Verma",
          address: "Kerala, India",
          category: "Accessories",
          createdAt: "2024-01-18",
          likes: 170,
          isLiked: true,
          views: 420,
          comments: 40,
          rating: 4.9,
          experience: "9 years",
          specialties: ["Jute Bags", "Cane Bags", "Designer Handbags"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 9,
          title: "Premium Herbal Teas",
          description:
            "Exclusive blends of tulsi, ginger, and exotic herbs for wellness.",
          image:
            "https://images.unsplash.com/photo-1590080875835-3f3db4e2a7c4?w=600&h=400&fit=crop",
          username: "Kiran Kumar",
          address: "Kerala, India",
          category: "Beverages",
          createdAt: "2024-01-15",
          likes: 140,
          isLiked: false,
          views: 310,
          comments: 24,
          rating: 4.7,
          experience: "6 years",
          specialties: ["Tulsi Tea", "Lemongrass Tea", "Ginger Tea"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 10,
          title: "Exclusive Clay Kitchenware",
          description:
            "Premium eco-friendly clay pots and kitchen sets for healthy cooking.",
          image:
            "https://images.unsplash.com/photo-1601396342975-63d35cf1aaba?w=600&h=400&fit=crop",
          username: "Ramesh Yadav",
          address: "Chennai, India",
          category: "Kitchenware",
          createdAt: "2024-01-12",
          likes: 130,
          isLiked: true,
          views: 280,
          comments: 21,
          rating: 4.6,
          experience: "15 years",
          specialties: ["Clay Pots", "Cooking Pans", "Eco Kitchenware"],
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
            Master <span className="text-[#DB2777]">Women</span> in
            HomeMadeProducts
          </h1>
          <p className="text-xl text-[#374151] max-w-2xl mx-auto leading-relaxed mb-8">
            Discover skilled{" "}
            <span className="text-[#DB2777]">HomeMadeProducts</span> for all
            your custom requirement needs
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
              <div className="text-[#374151]">
                Expertise for making Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">50+</div>
              <div className="text-[#374151]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">10+</div>
              <div className="text-[#374151]">New Products</div>
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
            <p className="text-[#374151] text-center mb-6">
              <a href="/login">
                Login to view all premium tailoring professionals and their
                exclusive services.
              </a>
            </p>
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
