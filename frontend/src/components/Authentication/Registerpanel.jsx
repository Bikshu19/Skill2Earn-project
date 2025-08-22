import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPanel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    gender: "", // No gender pre-selected now
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    calculatePasswordStrength();
  }, [formData.password]);

  const calculatePasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
      case 3:
        return "bg-yellow-500";
      case 4:
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Minimum 3 characters";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const formElement = document.querySelector(".registration-form");
      if (formElement) {
        formElement.classList.add("animate-pulse");
        setTimeout(() => formElement.classList.remove("animate-pulse"), 600);
      }
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.message || "Registration failed" });
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            username: "",
            gender: "",
            email: "",
            password: "",
          });
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setErrors({ submit: "Network error, please try again." });
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center transform animate-bounce">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 mb-4 animate-pulse">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600">
                You can now log in to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`registration-form max-w-md w-full space-y-8 relative z-10 transform transition-all duration-1000 animate-fadeIn bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20`}
        noValidate
      >
        {/* Top Heading with animation */}
        <div className="text-center mb-8 animate-slideInDown">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 transform hover:rotate-12 transition-transform duration-300 hover:scale-110">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Join Us Today
          </h2>
          <p className="text-gray-600">
            Create your account and start your journey
          </p>
        </div>

        {errors.submit && (
          <p className="mt-2 text-sm text-red-600 animate-slideInDown">
            {errors.submit}
          </p>
        )}

        {/* Username Field */}
        <div className="transform transition-all duration-500 delay-300">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-pink-600 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField("")}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                errors.username ? "border-red-500" : "border-gray-200"
              } ${
                focusedField === "username"
                  ? "transform scale-105 shadow-lg"
                  : ""
              }`}
              placeholder="Enter your username"
              required
            />
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ${
                focusedField === "username" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          {errors.username && (
            <p className="mt-2 text-sm text-red-600 animate-slideInDown">
              {errors.username}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div className="transform transition-all duration-500 delay-400">
          <label className="block text-sm font-semibold text-pink-600 mb-3">
            Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["male", "female", "other"].map((option) => (
              <label
                key={option}
                className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  formData.gender === option ? "scale-105" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                <div
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    formData.gender === option
                      ? "border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-lg"
                      : "border-gray-200 bg-white/70 text-gray-700 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}
                >
                  <div
                    className={`text-2xl mb-1 transform transition-transform duration-300 ${
                      formData.gender === option ? "scale-110" : ""
                    }`}
                  >
                    {option === "male"
                      ? "👨"
                      : option === "female"
                      ? "👩"
                      : "🧑"}
                  </div>
                  <span className="text-sm font-medium capitalize">
                    {option}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-2 text-sm text-red-600 animate-slideInDown">
              {errors.gender}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="transform transition-all duration-500 delay-500">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-pink-600 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                errors.email ? "border-red-500" : "border-gray-200"
              } ${
                focusedField === "email" ? "transform scale-105 shadow-lg" : ""
              }`}
              placeholder="Enter your email"
              required
            />
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ${
                focusedField === "email" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 animate-slideInDown">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="transform transition-all duration-500 delay-600">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-pink-600 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              className={`w-full px-4 py-4 pr-12 border-2 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                errors.password ? "border-red-500" : "border-gray-200"
              } ${
                focusedField === "password"
                  ? "transform scale-105 shadow-lg"
                  : ""
              }`}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-pink-500 hover:text-pink-600 transition-all duration-300 hover:scale-110"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            <div
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ${
                focusedField === "password" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          {formData.password && (
            <div className="mt-2 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {getPasswordStrengthText()}
                </span>
              </div>
            </div>
          )}
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 animate-slideInDown">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="transform transition-all duration-500 delay-700">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 disabled:opacity-70 disabled:cursor-not-allowed ${
              isLoading
                ? "animate-pulse"
                : "hover:from-pink-600 hover:to-rose-600"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Create Account</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            )}
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center transform transition-all duration-500 delay-800">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-300 hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>

      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
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
        .animate-slideInDown {
          animation: slideInDown 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
