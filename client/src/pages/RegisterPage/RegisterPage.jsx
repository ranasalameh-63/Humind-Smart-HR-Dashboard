
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, ChevronRight, Star, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/api/users/register",
        {
          name,
          email,
          password,
          role: "hr",
        },
        { withCredentials: true }
      );

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-[#3B1E54] text-4xl font-bold mb-2">Create Account</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-black text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-black text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label className="block text-black text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 sm:p-4 pr-12 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[48px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>


            <div className="relative mt-4">
              <label className="block text-black text-sm font-medium mb-2">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-3 sm:p-4 pr-12 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-[48px] text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>


            <div className="text-right">
              <a href="/login" className="text-black text-sm hover:underline">
                Already have an account?
              </a>
            </div>

            <button
              onClick={handleRegister}
              type="submit"
              className="w-full bg-[#9B7EBD] text-black py-4 rounded-lg font-semibold hover:bg-[#7E5A99] transition-colors duration-200"
            >
              Create Account
            </button>

          </div>
        </div>
      </div>

      {/* Right Panel - Testimonials */}
      <div className="hidden lg:block w-1/2 bg-[#9B7EBD] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B7EBD] to-[#3B1E54]"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
          <div className="w-full h-full border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center p-12">
          <div className="mb-8">
            <h2 className="text-white text-5xl font-bold mb-4">
              Humind
            </h2>
            <div className="text-white text-6xl font-serif">"</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <p className="text-white text-lg mb-6 leading-relaxed">
              "Joining Humind means stepping into a smarter work environment.
              From performance insights to personalized growth paths — we help you thrive, not just survive."
            </p>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[#3B1E54] font-semibold text-lg">Empowered Employee</h4>
                <p className="text-white/80">Optimized by AI</p>
              </div>


            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-8 h-8 text-[#3B1E54]" fill="currentColor" />
            </div>

            <h3 className="text-[#3B1E54] text-xl font-bold mb-2">
              Build your path with Humind.
            </h3>
            <p className="text-gray-600 mb-4">
              Register now to access intelligent tools that support your growth, track your performance, and personalize your development.
            </p>

          </div>
        </div>
      </div>


    </div>
  );
}
