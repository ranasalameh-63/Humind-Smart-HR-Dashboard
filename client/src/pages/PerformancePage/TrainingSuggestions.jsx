import React, { useState } from 'react';
import { BookOpen, TrendingUp, Target, Zap, ChevronRight, Sparkles } from 'lucide-react';

export default function TrainingSuggestions({ trainingSuggestions }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!trainingSuggestions || trainingSuggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-[#9B7EBD] to-[#3B1E54] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9B7EBD] rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        <p className="text-[#3B1E54] text-lg font-medium mb-2">No Training Suggestions</p>
        <p className="text-[#9B7EBD] text-sm text-center max-w-sm">
          Check back later for personalized training recommendations to enhance your skills.
        </p>
      </div>
    );
  }

  const getIcon = (index) => {
    const icons = [BookOpen, TrendingUp, Target, Zap];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-[#9B7EBD] to-[#3B1E54] rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#3B1E54]">Training Suggestions</h3>
        <div className="h-px bg-gradient-to-r from-[#9B7EBD] to-transparent flex-1 ml-4"></div>
      </div>

      {/* Suggestions Grid */}
      <div className="grid gap-4">
        {trainingSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
              hoveredIndex === index
                ? 'transform scale-[1.02] shadow-2xl shadow-[#9B7EBD]/20'
                : 'shadow-lg hover:shadow-xl'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-[#9B7EBD]/5"></div>
            
            {/* Animated border */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
              hoveredIndex === index
                ? 'bg-gradient-to-r from-[#9B7EBD] via-[#3B1E54] to-[#9B7EBD] p-[2px]'
                : 'bg-gradient-to-r from-[#9B7EBD]/20 to-[#3B1E54]/20 p-[1px]'
            }`}>
              <div className="w-full h-full bg-white rounded-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative p-6 flex items-center gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                hoveredIndex === index
                  ? 'bg-gradient-to-br from-[#3B1E54] to-[#9B7EBD] text-white transform rotate-3 scale-110'
                  : 'bg-gradient-to-br from-[#9B7EBD]/10 to-[#3B1E54]/10 text-[#3B1E54]'
              }`}>
                {getIcon(index)}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-[#3B1E54] transition-all duration-300 ${
                  hoveredIndex === index ? 'text-lg' : 'text-base'
                }`}>
                  {suggestion}
                </p>
                <div className={`flex items-center gap-2 mt-1 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-2 h-2 bg-[#9B7EBD] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#9B7EBD] font-medium">Recommended for you</span>
                </div>
              </div>

              {/* Arrow */}
              <div className={`flex-shrink-0 transition-all duration-300 ${
                hoveredIndex === index
                  ? 'transform translate-x-1 text-[#3B1E54]'
                  : 'text-[#9B7EBD]/50'
              }`}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[#9B7EBD]/5 to-[#3B1E54]/5 rounded-2xl transition-opacity duration-300 ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Floating particles effect */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-[#9B7EBD] rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-[#3B1E54] rounded-full animate-ping delay-100"></div>
                <div className="absolute bottom-6 right-6 w-1 h-1 bg-[#9B7EBD] rounded-full animate-ping delay-200"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-[#9B7EBD]/10">
        <div className="flex items-center gap-1">
          {trainingSuggestions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                hoveredIndex === index
                  ? 'bg-[#3B1E54] scale-125'
                  : 'bg-[#9B7EBD]/30'
              }`}
            ></div>
          ))}
        </div>
        <span className="text-sm text-[#9B7EBD] ml-2">
          {trainingSuggestions.length} suggestion{trainingSuggestions.length !== 1 ? 's' : ''} available
        </span>
      </div>
    </div>
  );
}