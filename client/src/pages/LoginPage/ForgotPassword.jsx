import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:9000/api/auth/forgot-password', { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden ">
      {/* Full page layout with split design */}
      <div className="min-h-screen flex overflow-hidden">
        {/* Left side - Decorative gradient section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#9B7EBD] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-32 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
            <div className="bg-white/20 rounded-full w-24 h-24 flex items-center justify-center backdrop-blur-sm mb-8">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Secure Password Recovery</h1>
            <p className="text-white/90 text-lg max-w-md leading-relaxed">
              We'll help you regain access to your account quickly and securely. Enter your email to get started.
            </p>
          </div>
        </div>

        {/* Right side - Form section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile header (visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <div className="bg-[#9B7EBD] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#3B1E54] mb-2">Forgot Password?</h2>
              <p className="text-gray-600">No worries, we'll send you reset instructions</p>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block pt-25">
              <h2 className="text-3xl font-bold text-[#3B1E54] mb-3">Reset Your Password</h2>
              <p className="text-gray-600 text-lg">Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email input with enhanced styling */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#3B1E54] focus:bg-white transition-all duration-200 placeholder-gray-500 text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#9B7EBD] text-white py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 font-semibold disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Additional options */}
            <div className="mt-8 space-y-4">
              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Help text */}
              <div className="text-center">
            <p className="text-gray-600 text-sm">
                Remember your password? 
                <Link
                to="/login"
                className="text-[#3B1E54] hover:text-[#4a276b] font-medium ml-1 transition-colors duration-200"
                >
                Sign in here
                </Link>
            </p>
            </div>
            </div>

            {/* Footer text */}
            <div className="mt-12 text-center">
              <p className="text-xs text-gray-500">
                If you don't receive an email within a few minutes, check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
