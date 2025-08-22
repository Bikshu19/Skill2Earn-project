import React, { useState, useEffect } from "react";
import {
  Users,
  MapPin,
  MessageSquare,
  Phone,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  Clock,
  Shield,
  ArrowRight,
  Play,
} from "lucide-react";

export default function AboutPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location-Based Discovery",
      description:
        "Find skilled professionals in your local area with our smart location-based search system.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Verified Professionals",
      description:
        "Every candidate goes through our rigorous verification process to ensure quality and authenticity.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Instant Communication",
      description:
        "Connect immediately with candidates through our built-in messaging and calling system.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description:
        "Your data and communications are protected with enterprise-level security measures.",
    },
  ];

  const stats = [
    {
      number: "250+",
      label: "Active Users",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "10+",
      label: "Skill Categories",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      number: "100+",
      label: "Successful Connections",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "4.8/5",
      label: "Average Rating",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Register & Login",
      description:
        "Create your account and join our growing community of professionals and clients.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      step: "02",
      title: "Choose Location",
      description:
        "Select your area to discover available services and skilled professionals nearby.",
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      step: "03",
      title: "Browse Categories",
      description:
        "Explore various skill categories like tailoring, tutoring, and many more services.",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      step: "04",
      title: "Connect Instantly",
      description:
        "Send connection requests and start communicating through messages or calls.",
      icon: <MessageSquare className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-pink-100/60 to-purple-100/70">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible.hero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-6 animate-bounce">
              Connecting Skills with Opportunities
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            About <span className="text-pink-600">SkillConnect</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
            We're revolutionizing how people discover and connect with skilled
            professionals in their local communities. From tailoring to
            tutoring, find the perfect match for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 transform hover:scale-105 transition-all duration-300">
              <a href="/explore">Get Started Today</a>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200 ${
          isVisible.stats
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg group"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors duration-300">
                  <div className="text-pink-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-300 ${
          isVisible.mission
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Our <span className="text-pink-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe everyone has unique skills that deserve recognition
                and opportunity. Our platform bridges the gap between talented
                professionals and clients who need their expertise.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you're a skilled tailor, experienced tutor, or expert in
                any field, we provide the tools and platform to showcase your
                talents and connect with clients in your local area.
              </p>

              <div className="space-y-4">
                {[
                  "Empower local professionals",
                  "Create meaningful connections",
                  "Build trusted communities",
                  "Enable secure transactions",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-pink-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
                <Award className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
                <p className="text-pink-100 mb-6">
                  Every professional on our platform goes through a
                  comprehensive verification process by our admin team to ensure
                  the highest quality standards.
                </p>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-pink-100">Verification Rate</span>
                    <span className="font-bold">98.5%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-[98.5%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm transition-all duration-1000 delay-400 ${
          isVisible["how-it-works"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How It <span className="text-pink-600">Works</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Getting started is simple. Follow these easy steps to connect with
              skilled professionals or showcase your own expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors duration-300">
                      <div className="text-pink-600">{item.icon}</div>
                    </div>
                    <div className="text-3xl font-bold text-pink-600 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-pink-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section
        id="features"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-500 ${
          isVisible.features
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Platform <span className="text-pink-600">Features</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover the powerful features that make our platform the best
              choice for connecting skills with opportunities.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg 
                     hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
