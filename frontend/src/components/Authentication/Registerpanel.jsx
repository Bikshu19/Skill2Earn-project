import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPanel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    gender: "male",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
            gender: "male",
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 p-6">
        <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 mb-6 text-white">
              ✓
            </div>
            <h2 className="text-3xl mb-4 font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Registration Successful!
            </h2>
            <p>You can now log in to your account.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-0"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-300 rounded-full opacity-10 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="registration-form relative z-10 w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl border border-white/20 shadow-lg space-y-6"
        noValidate
      >
        {errors.submit && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {errors.submit}
          </div>
        )}
        <div>
          <label
            htmlFor="username"
            className="block mb-2 font-semibold text-pink-600"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className={`w-full p-4 rounded-xl border-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-pink-200`}
            required
          />
          {errors.username && (
            <p className="mt-1 text-red-500">{errors.username}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block mb-2 font-semibold text-pink-600"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-4 rounded-xl border-2 ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-pink-200`}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-red-500">{errors.gender}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-pink-600"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className={`w-full p-4 rounded-xl border-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-pink-200`}
            required
          />
          {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-semibold text-pink-600"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full p-4 rounded-xl border-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-pink-200 pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500">{errors.password}</p>
          )}
          {formData.password && (
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div
                className={`${getPasswordStrengthColor()} h-2 rounded-full transition-all`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
              <p className="mt-1 text-sm text-gray-600">
                {getPasswordStrengthText()}
              </p>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-4 text-white rounded-xl transition-colors ${
            isLoading
              ? "bg-pink-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-pink-600 hover:text-pink-700 underline"
          >
            Sign In
          </button>
        </div>
      </form>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
