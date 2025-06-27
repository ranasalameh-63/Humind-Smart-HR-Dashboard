
import React from 'react';
import { User, TrendingUp, Award, ArrowRight } from 'lucide-react';

export default function OverviewCard({ employee = {}, overview = {}, onViewDetails }) {
  const getPerformanceColor = (score) => {
    if (!score) return '#9B7EBD';
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getPerformanceIcon = (score) => {
    if (!score) return <TrendingUp className="w-4 h-4" />;
    if (score >= 80) return <Award className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-50 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B1E54] via-[#9B7EBD] to-[#3B1E54]"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              {employee.profileImage ? (
                <img
                  src={employee.profileImage}
                  alt={`${employee.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white bg-opacity-20 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          <div>
            <h2 className="text-xl font-bold text-[#3B1E54] group-hover:text-[#9B7EBD] transition-colors">
              {employee.name || "Employee Name"}
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              {employee.position || "Position"}
            </p>
            <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block mt-1">
              {employee.department || "Department"}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: getPerformanceColor(overview.score) + '20' }}
            >
              <div style={{ color: getPerformanceColor(overview.score) }}>
                {getPerformanceIcon(overview.score)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Performance Score</p>
              <p className="text-xs text-gray-500">Current rating</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: getPerformanceColor(overview.score) }}>
              {overview.score ?? "..."}
            </p>
            <p className="text-xs text-gray-500">/100</p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-[#3B1E54]/5 to-[#9B7EBD]/5 rounded-xl border border-[#9B7EBD]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#3B1E54]">Performance Level</p>
              <p className="text-lg font-bold text-[#3B1E54]">
                {overview.performanceLabel || "Loading..."}
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewDetails}
        className="w-full bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white py-3 px-4 rounded-xl font-semibold 
                   hover:from-[#9B7EBD] hover:to-[#3B1E54] transition-all duration-300 
                   flex items-center justify-center space-x-2 group/btn shadow-lg hover:shadow-xl"
      >
        <span>View Details</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

