import React, { useState, useEffect } from 'react';

const Monster404Page = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 overflow-hidden">
      <div className="flex items-center justify-center gap-16 max-w-6xl mx-auto animate-pulse">
        {/* Monster Character */}
        <div className="relative animate-bounce">
          {/* Monster Body */}
          <div className="relative">
            {/* Main body - oval shape */}
            <div 
              className="w-80 h-96 rounded-full relative overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #9B7EBD 0%, #3B1E54 100%)' }}
            >
              {/* Body highlights */}
              <div 
                className="absolute top-8 left-12 w-32 h-40 rounded-full opacity-30"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' }}
              ></div>
            </div>

            {/* Eye */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div className={`w-20 h-20 rounded-full transition-all duration-200 ${isBlinking ? 'h-2' : 'h-20'}`} style={{ backgroundColor: '#3B1E54' }}>
                  {!isBlinking && (
                    <div className="w-8 h-8 bg-white rounded-full mt-6 ml-6 shadow-lg"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Mouth */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-8 bg-black rounded-full shadow-inner">
                {/* Teeth */}
                <div className="flex justify-center pt-1">
                  <div className="w-2 h-3 bg-white transform rotate-12 mr-1"></div>
                  <div className="w-2 h-4 bg-white"></div>
                  <div className="w-2 h-3 bg-white transform -rotate-12 ml-1"></div>
                </div>
              </div>
            </div>

            {/* Arms */}
            <div className="absolute top-32 -left-8">
              <div 
                className="w-12 h-24 rounded-full transform -rotate-12 shadow-lg"
                style={{ backgroundColor: '#9B7EBD' }}
              ></div>
            </div>
            <div className="absolute top-32 -right-8">
              <div 
                className="w-12 h-24 rounded-full transform rotate-12 shadow-lg"
                style={{ backgroundColor: '#9B7EBD' }}
              ></div>
            </div>

            {/* Legs */}
            <div className="absolute -bottom-8 left-16">
              <div 
                className="w-16 h-20 rounded-full shadow-lg"
                style={{ backgroundColor: '#3B1E54' }}
              ></div>
            </div>
            <div className="absolute -bottom-8 right-16">
              <div 
                className="w-16 h-20 rounded-full shadow-lg"
                style={{ backgroundColor: '#3B1E54' }}
              ></div>
            </div>

            {/* Small horns */}
            <div className="absolute -top-4 left-20">
              <div 
                className="w-4 h-6 rounded-t-full transform -rotate-12"
                style={{ backgroundColor: '#3B1E54' }}
              ></div>
            </div>
            <div className="absolute -top-4 right-20">
              <div 
                className="w-4 h-6 rounded-t-full transform rotate-12"
                style={{ backgroundColor: '#3B1E54' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-left max-w-lg">
          <h1 className="text-7xl font-black mb-6" style={{ color: '#000000' }}>
            OOPS! PAGE<br/>NOT FOUND.
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed" style={{ color: '#3B1E54' }}>
            You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.
          </p>
          
          <button 
            className="px-8 py-4 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:brightness-110"
            style={{ backgroundColor: '#3B1E54' }}
            onClick={() => window.history.back()}
          >
            BACK TO HOME
          </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full opacity-20"
              style={{ backgroundColor: '#9B7EBD' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monster404Page;