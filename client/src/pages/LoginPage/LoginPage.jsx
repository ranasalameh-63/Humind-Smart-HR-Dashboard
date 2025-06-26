import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Welcome back 💜");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 lg:py-0 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#9B7EBD] rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#3B1E54] rounded-full translate-x-12 translate-y-12"></div>
        </div>
        
        <div className="max-w-md w-full mx-auto relative z-10 mt-25">
          <div className="mb-8">
            {/* Enhanced Welcome Message */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-[#3B1E54] text-3xl sm:text-4xl font-bold mb-2">Welcome back</h2>
              <p className="text-gray-600 text-sm sm:text-base">Please enter your account details to continue</p>
            </div>
           
            <div className="space-y-6">
              {/* Enhanced Email Input */}
              <div className="group">
                <label className="block text-[#3B1E54] text-sm font-medium mb-3 transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              </div>
             
              {/* Enhanced Password Input */}
              <div className="group">
                <label className="block text-[#3B1E54] text-sm font-medium mb-3 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl bg-gray-50 text-black border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#9B7EBD] focus:bg-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-[#9B7EBD] hover:text-[#3B1E54] transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
              
              {/* Enhanced Sign In Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
           
            {/* Enhanced Footer Section */}
            <div className="text-center mt-8 md:mt-10">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm">New to Humind?</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <a 
                href="/register" 
                className="inline-flex items-center justify-center px-6 py-3 text-[#3B1E54] border-2 border-[#3B1E54] rounded-xl hover:bg-[#3B1E54] hover:text-white transition-all duration-200 font-medium"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className="w-full lg:w-1/2 bg-[#9B7EBD] flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 lg:py-0 relative">
        <div className="max-w-lg w-full mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 leading-tight">
            What's our<br />
            Employees Think.
          </h2>
          
          <div className="mb-6 sm:mb-8">
            <p className="text-white text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              "Humind made it easier to track my progress, receive personalized training, 
              and stay engaged at work — it truly feels like the company cares."
            </p>
            
            <div className="mb-4 sm:mb-6">
              <h3 className="text-white text-lg sm:text-xl font-semibold">People First, Always</h3>
              <p className="text-white opacity-90">Turning data into meaningful employee experiences.</p>
            </div>
            
          </div>
          
          {/* Bottom card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 relative">
            <div className="absolute -top-3 -right-3 w-10 sm:w-12 h-10 sm:h-12 bg-[#3B1E54] rounded-full flex items-center justify-center">
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-current" />
            </div>
            
            <h3 className="text-[#3B1E54] text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              Empower Your Team with Smart Insights
            </h3>
            
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              Discover how AI-driven performance analytics and training suggestions can elevate your workforce.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}