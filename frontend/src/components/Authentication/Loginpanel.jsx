import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ModernAuthSystem() {
  const [currentPage, setCurrentPage] = useState("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Login Page Component
  const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
      return newErrors;
    };

    const handleSubmit = async () => {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length === 0) {
        setIsLoading(true);

        try {
          const res = await fetch("http://localhost:5000/api/login", {
            // Change URL according to backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          const contentType = res.headers.get("content-type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await res.json();
          } else {
            throw new Error("Server did not return JSON");
          }

          if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            console.log("Login successful with role:", data.role);

            if (data.role === "admin") {
              navigate("/admin");
            } else if (data.role === "user") {
              console.log("Navigate to profile");
              navigate("/profile");
            } else {
              navigate("/"); // fallback
            }
          } else {
            alert(data.message || "Login failed");
          }
        } catch (err) {
          alert("Login error: " + err.message);
          console.error("Login error details:", err);
        }

        setIsLoading(false);
      } else {
        setErrors(newErrors);
      }
    };

    const handleSocialLogin = async (provider) => {
      console.log(`${provider} login initiated`);
      alert(
        `${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } login would open here!\n\nIn a real app, this would:\n1. Open ${provider} OAuth popup\n2. Handle authentication\n3. Redirect back to your app\n4. Create user session`
      );
    };

    const handleSignUpClick = () => {
      alert(
        "Sign up page would open here!\n\nIn a real app, this would navigate to the registration form."
      );
    };

    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                  errors.email
                    ? "border-red-400 shake"
                    : "border-gray-200 hover:border-pink-300"
                }`}
                placeholder="Enter your email"
              />
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transform origin-left transition-transform duration-300 ${
                  formData.email ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center animate-fadeIn">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                  errors.password
                    ? "border-red-400 shake"
                    : "border-gray-200 hover:border-pink-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-pink-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  )}
                </svg>
              </button>
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transform origin-left transition-transform duration-300 ${
                  formData.password ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center animate-fadeIn">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  rememberMe
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 border-pink-500 scale-110"
                    : "border-gray-300 hover:border-pink-400 group-hover:scale-105"
                }`}
              >
                {rememberMe && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-sm text-gray-700 group-hover:text-pink-600 transition-colors duration-200">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => setCurrentPage("forgot")}
              className="text-sm font-medium text-pink-600 hover:text-rose-600 transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full relative bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            <span
              className={`transition-opacity duration-200 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              Sign In
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Divider */}
        <div className="mt-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-pink-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 relative z-10"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EA4335"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#4285F4"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10">
              Google
            </span>
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-pink-300 hover:shadow-md transform hover:scale-105 transition-all duration-200 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 relative z-10"
              fill="#1877F2"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10">
              Facebook
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => handleSignUpClick()}
              className="font-semibold text-pink-600 hover:text-rose-600 transition-colors duration-200 hover:underline"
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
    );
  };

  // Forgot Password Page Component (no changes from your original)

  const ForgotPasswordPage = () => {
    // ... your original ForgotPasswordPage code ...
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email");
        return;
      }

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset password request for:", email);
      setIsSubmitted(true);
      setIsLoading(false);
    };

    if (isSubmitted) {
      return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-pulse">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Check Your Email
            </h2>
            <div className="space-y-3">
              <p className="text-gray-600 text-lg">
                We've sent a password reset link to
              </p>
              <p className="text-pink-600 font-semibold text-lg break-all">
                {email}
              </p>
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-pink-700">
                  <span className="font-medium">💡 Tip:</span> Didn't receive
                  the email? Check your spam folder or try again with a
                  different email address.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
                setError("");
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Try Different Email
            </button>
            <button
              onClick={() => setCurrentPage("login")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 12H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-6.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            No worries! Enter your email and we'll send you reset instructions
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="reset-email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                  error
                    ? "border-red-400 shake"
                    : "border-gray-200 hover:border-pink-300"
                }`}
                placeholder="Enter your email address"
              />
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transform origin-left transition-transform duration-300 ${
                  email ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
            {error && (
              <p className="text-red-500 text-sm flex items-center animate-fadeIn">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full relative bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            <span
              className={`transition-opacity duration-200 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              Send Reset Instructions
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage("login")}
            className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-rose-600 transition-colors duration-200 hover:underline group"
          >
            <svg
              className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Your existing animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-4 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
            mounted ? "animation-delay-0" : ""
          }`}
        ></div>
        <div
          className={`absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
            mounted ? "animation-delay-2000" : ""
          }`}
        ></div>
        <div
          className={`absolute -bottom-8 left-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
            mounted ? "animation-delay-4000" : ""
          }`}
        ></div>
      </div>

      <div
        className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Logo and title */}
        {/* ... your existing logo UI ... */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {currentPage === "login" ? "Welcome Back" : "Account Recovery"}
          </h1>
          <p className="text-gray-600 text-sm">
            {currentPage === "login"
              ? "Sign in to continue your journey"
              : "Regain access to your account"}
          </p>
        </div>

        {/* Conditional Page Render */}
        {currentPage === "login" ? <LoginPage /> : <ForgotPasswordPage />}
      </div>

      {/* Your existing animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
