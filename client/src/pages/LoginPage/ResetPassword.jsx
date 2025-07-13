import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

   try {
      const res = await axios.post(`http://localhost:9000/api/auth/reset-password/${token}`, { password });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }finally {
      setIsLoading(false);
    }
  };



  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak';

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      {/* Full page layout with split design */}
      <div className="min-h-screen flex">
        {/* Left side - Decorative gradient section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#9B7EBD] relative overflow-hidden">       
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
            <div className="bg-white/20 rounded-full w-24 h-24 flex items-center justify-center backdrop-blur-sm mb-8">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Secure Password Reset</h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              Choose a strong password to protect your account. Make sure it's something you'll remember but others can't guess.
            </p>
          </div>
        </div>

        {/* Right side - Form section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile header (visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="bg-[#9B7EBD] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#3B1E54] mb-2">Reset Password</h2>
              <p className="text-gray-600">Enter your new password below</p>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block pt-25">
              <h2 className="text-3xl font-bold text-[#3B1E54] mb-3">Create New Password</h2>
              <p className="text-gray-600 text-lg mb-5">Your new password must be different from previous passwords.</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Password input with enhanced styling */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#3B1E54] focus:bg-white transition-all duration-200 placeholder-gray-500 text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength === 'strong' ? 'bg-green-500 w-full' :
                            passwordStrength === 'medium' ? 'bg-yellow-500 w-2/3' :
                            'bg-red-500 w-1/3'
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 'strong' ? 'text-green-600' :
                        passwordStrength === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {passwordStrength === 'strong' ? 'Strong' :
                         passwordStrength === 'medium' ? 'Medium' : 'Weak'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !password}
                className="w-full bg-[#9B7EBD] text-white py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 font-semibold disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Additional options */}
            <div className="mt-8 space-y-4">
              {/* Back to login */}
             <div className="text-center">
                <Link
                    to="/login"
                    className="text-[#3B1E54] hover:text-[#4a276b] font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Login
                </Link>
                </div>

              {/* Security tips */}
              <div className="bg-gray-50 rounded-2xl p-4 mt-6">
                <h3 className="font-semibold text-[#3B1E54] mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Password Security Tips
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use at least 8 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                  <li>• Avoid common words or personal information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;