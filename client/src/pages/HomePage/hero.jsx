import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[80vh] px-4 py-12 pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#3B1E54] leading-tight">
                Welcome to Humind
              </h1>
              <p className="text-[#000000] text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Your smart HR dashboard to analyze performance, predict churn, and recommend personalized growth paths for your team.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="bg-[#9B7EBD] hover:bg-[#3B1E54] text-white px-8 py-4 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 text-center font-semibold"
              >
                Go to Dashboard
              </Link>
              <button className="border-2 border-[#9B7EBD] text-[#9B7EBD] hover:bg-[#9B7EBD] hover:text-white px-8 py-4 rounded-xl transition duration-300 font-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#9B7EBD] rounded-full opacity-10"></div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#3B1E54] rounded-full opacity-10"></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-[#9B7EBD] to-[#3B1E54] p-8 rounded-2xl shadow-2xl">
                <svg 
                  className="w-64 h-64 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-[#9B7EBD] text-xl font-bold">✓</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#3B1E54] rounded-full"></div>
                <div className="absolute top-1/2 -left-3 w-4 h-4 bg-white rounded-full opacity-80"></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}