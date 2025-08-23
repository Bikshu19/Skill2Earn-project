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
          title: "Bridal Makeup Artist",
          description:
            "Professional bridal makeup with premium products ensuring long-lasting beauty for your big day.",
          image:
            "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&h=400&fit=crop",
          username: "Aarti Sharma",
          address: "Delhi, India",
          category: "Bridal Makeup",
          createdAt: "2024-01-20",
          likes: 180,
          isLiked: false,
          views: 420,
          comments: 52,
          rating: 4.9,
          experience: "8 years",
          specialties: ["HD Makeup", "Airbrush Makeup", "Saree Draping"],
          isPublic: true,
        },
        {
         id: 2,
          title: "Party & Event Makeup Specialist",
          description:
            "Expert in glam, cocktail, and party makeup with a trendy touch. Available for events and functions.",
          image:
            "https://images.unsplash.com/photo-1596464716121-9cd50a1b47f2?w=600&h=400&fit=crop",
          username: "Ritu Verma",
          address: "Mumbai, India",
          category: "Party Makeup",
          createdAt: "2024-01-18",
          likes: 120,
          isLiked: true,
          views: 310,
          comments: 34,
          rating: 4.8,
          experience: "6 years",
          specialties: ["Cocktail Looks", "Evening Glam", "Hairstyling"],
          isPublic: true,
        },
        {
           id: 3,
          title: "Skincare & Facial Specialist",
          description:
            "Certified beautician offering advanced facials, skin treatments, and glow therapies.",
          image:
            "https://images.unsplash.com/photo-1583316190122-c7ba955f09a3?w=600&h=400&fit=crop",
          username: "Neha Gupta",
          address: "Bangalore, India",
          category: "Skincare",
          createdAt: "2024-01-15",
          likes: 145,
          isLiked: false,
          views: 350,
          comments: 41,
          rating: 5.0,
          experience: "10 years",
          specialties: ["Bridal Facials", "Detox Treatments", "Anti-aging"],
          isPublic: true,
        },
        {
         id: 4,
          title: "Hair Styling & Treatments",
          description:
            "Professional hairstylist providing keratin, smoothening, hair coloring, and bridal hairstyles.",
          image:
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=400&fit=crop",
          username: "Anjali Singh",
          address: "Hyderabad, India",
          category: "Hair Styling",
          createdAt: "2024-01-12",
          likes: 88,
          isLiked: false,
          views: 210,
          comments: 27,
          rating: 4.7,
          experience: "7 years",
          specialties: ["Keratin", "Bridal Hairdo", "Hair Coloring"],
          isPublic: true,
        },
        {
           id: 5,
          title: "Mehendi & Henna Artist",
          description:
            "Specialist in bridal and designer mehendi with intricate patterns and natural colors.",
          image:
            "https://images.unsplash.com/photo-1598514982345-ef1d4ac95e6c?w=600&h=400&fit=crop",
          username: "Pooja Patel",
          address: "Ahmedabad, India",
          category: "Mehendi Art",
          createdAt: "2024-01-10",
          likes: 110,
          isLiked: false,
          views: 280,
          comments: 31,
          rating: 4.8,
          experience: "9 years",
          specialties: ["Bridal Mehendi", "Arabic Designs", "Rajasthani Style"],
          isPublic: true,
        },
        {
          id: 6,
          title: "Nail Art & Extensions",
          description:
            "Trendy nail extensions, gel polish, and artistic nail designs for all occasions.",
          image:
            "https://images.unsplash.com/photo-1628157588553-5af9a2c4c8b5?w=600&h=400&fit=crop",
          username: "Simran Kaur",
          address: "Chandigarh, India",
          category: "Nail Art",
          createdAt: "2024-01-08",
          likes: 92,
          isLiked: true,
          views: 230,
          comments: 29,
          rating: 4.9,
          experience: "5 years",
          specialties: ["Gel Nails", "3D Nail Art", "Bridal Nails"],
          isPublic: true,
        },
        // PRIVATE / PREMIUM (4)
        {
           id: 7,
          title: "Luxury Bridal Makeup Package",
          description:
            "Exclusive bridal makeup with international products, skin prep, and celebrity-style looks.",
          image:
            "https://images.unsplash.com/photo-1606813902788-d7bbeb33d468?w=600&h=400&fit=crop",
          username: "Kavya Reddy",
          address: "Gurgaon, India",
          category: "Luxury Makeup",
          createdAt: "2024-01-05",
          likes: 165,
          isLiked: false,
          views: 431,
          comments: 63,
          rating: 5.0,
          experience: "12 years",
          specialties: ["International Brands", "Airbrush HD", "Pre-Wedding Skin Prep"],
          isPremium: true,
          isPublic: false,
        },
        {
         id: 8,
          title: "Spa & Relaxation Expert",
          description:
            "Premium spa services including aromatherapy, massages, and luxury skin treatments.",
          image:
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04d7?w=600&h=400&fit=crop",
          username: "Ravi Mehta",
          address: "Jaipur, India",
          category: "Spa & Wellness",
          createdAt: "2024-01-03",
          likes: 92,
          isLiked: false,
          views: 238,
          comments: 33,
          rating: 4.9,
          experience: "11 years",
          specialties: ["Aromatherapy", "Luxury Spa", "Deep Relaxation"],
          isPremium: true,
          isPublic: false,
        },
        {
          id: 9,
          title: "Destination Wedding Beautician",
          description:
            "Available for travel to provide complete bridal beauty package for destination weddings.",
          image:
            "https://images.unsplash.com/photo-1526045478516-99145907023c?w=600&h=400&fit=crop",
          username: "Sunita Joshi",
          address: "Kolkata, India",
          category: "Destination Bridal",
          createdAt: "2024-01-01",
          likes: 74,
          isLiked: true,
          views: 154,
          comments: 26,
          rating: 4.8,
          experience: "14 years",
          specialties: ["On-site Services", "Complete Bridal Package", "Destination Weddings"],
          isPremium: true,
          isPublic: false,
        },
        {
           id: 10,
          title: "Celebrity Makeup Artist",
          description:
            "Worked with models & actresses. Offers luxury makeover and red-carpet looks.",
          image:
            "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&h=400&fit=crop",
          username: "Deepa Nair",
          address: "Kochi, India",
          category: "Celebrity Makeup",
          createdAt: "2023-12-28",
          likes: 139,
          isLiked: false,
          views: 301,
          comments: 49,
          rating: 4.9,
          experience: "15 years",
          specialties: ["Red Carpet Looks", "Celebrity Clients", "Luxury Brands"],
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
            Master <span className="text-[#DB2777]">Women</span> Beautician
          </h1>
          <p className="text-xl text-[#374151] max-w-2xl mx-auto leading-relaxed mb-8">
            Discover skilled <span className="text-[#DB2777]">Beautician professionals</span> for
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
              <div className="text-3xl font-bold text-[#DB2777]">{skills.length}+</div>
              <div className="text-[#374151]">Expert Beauticians</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">50+</div>
              <div className="text-[#374151]">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#DB2777]">10+</div>
              <div className="text-[#374151]">Specialties</div>
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
                      <span className="text-sm font-medium">{skill.comments}</span>
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
                  <p className="text-lg text-[#374151] leading-relaxed">{skill.description}</p>

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
                    <h3 className="text-xl font-bold text-[#1F2937]">{skill.username}</h3>
                    <div className="flex items-center gap-2 text-pink-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{skill.address}</span>
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
              {isLoggedIn ? "Show More Tailors" : "Login to See More Premium Tailors"}
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-up">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#1F2937]">Login Required</h2>
            <p className="text-[#374151] text-center mb-6">
              Login to view all premium tailoring professionals and their exclusive services.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-pink-700"
              >
                Login & Continue
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full text-[#374151] py-2 text-sm hover:text-[#1F2937] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TailoringSkillsDisplay;
