import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Users } from "lucide-react";

export default function ContactUsProfessionalFull() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitResponse, setSubmitResponse] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitResponse(null);

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setSubmitResponse({
        type: "success",
        message: "Message sent! We'll contact you soon.",
      });
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitResponse(null);
        setFormData({ username: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (error) {
      setSubmitResponse({
        type: "error",
        message: error.message || "Error sending message. Try again.",
      });
      setIsSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmitResponse(null);
    setErrors({});
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Get in <span className="text-pink-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-10 transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12 animate-bounce">
                <div
                  className={`w-20 h-20 ${
                    submitResponse?.type === "success"
                      ? "bg-green-100"
                      : "bg-red-100"
                  } rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  {submitResponse?.type === "success" ? (
                    <Send className="w-10 h-10 text-green-600" />
                  ) : (
                    <Mail className="w-10 h-10 text-red-600" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {submitResponse?.type === "success" ? "Success!" : "Oops!"}
                </h3>
                <p className="text-gray-700 mb-4">{submitResponse?.message}</p>
                {submitResponse?.type === "error" && (
                  <button
                    onClick={resetForm}
                    className="bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border-2 ${
                        errors.username ? "border-red-300" : "border-gray-200"
                      } rounded-lg focus:border-pink-600 focus:ring-0 transition`}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 border-2 ${
                        errors.email ? "border-red-300" : "border-gray-200"
                      } rounded-lg focus:border-pink-600 focus:ring-0 transition`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 border-2 ${
                      errors.subject ? "border-red-300" : "border-gray-200"
                    } rounded-lg focus:border-pink-600 focus:ring-0 transition`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more..."
                    className={`w-full px-4 py-3 border-2 ${
                      errors.message ? "border-red-300" : "border-gray-200"
                    } rounded-lg focus:border-pink-600 focus:ring-0 transition resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Cards */}
          <div className="grid gap-8">
            {[
              {
                icon: <Mail className="w-6 h-6 text-pink-600" />,
                title: "Email Us",
                lines: ["hello@skill2earn.com", "support@skill2earn.com"],
              },
              {
                icon: <Phone className="w-6 h-6 text-pink-600" />,
                title: "Call Us",
                lines: [
                  "Mon-Fri 9am-6pm",
                  "+91 98765 43210",
                  "+91 91234 56789",
                ],
              },
              {
                icon: <MapPin className="w-6 h-6 text-pink-600" />,
                title: "Location",
                lines: ["Online / Remote Support"],
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-105 transition hover:shadow-2xl min-h-[180px] flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center shadow-md">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {card.title}
                    </h3>
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-gray-600 mt-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s forwards;
        }
      `}</style>
    </section>
  );
}
