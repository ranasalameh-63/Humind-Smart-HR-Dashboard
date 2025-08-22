import React from 'react';
import { User, TrendingUp, Award, ArrowRight, Calendar } from 'lucide-react';

export default function OverviewCard({ employee = {}, overview = {}, onViewDetails }) {
  const getPerformanceColor = (score) => {
    if (!score) return '#9B7EBD';
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getPerformanceIcon = (score) => {
    if (!score) return <TrendingUp className="w-3.5 h-3.5" />;
    if (score >= 80) return <Award className="w-3.5 h-3.5" />;
    return <TrendingUp className="w-3.5 h-3.5" />;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B1E54] via-[#9B7EBD] to-[#3B1E54]"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white">
            {employee.profileImage ? (
              <img
                src={employee.profileImage}
                alt={`${employee.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white bg-opacity-20 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#3B1E54] group-hover:text-[#9B7EBD] transition-colors">
              {employee.name || "Employee Name"}
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              {employee.position || "Position"}
            </p>
            <p className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full inline-block mt-1">
              {employee.department || "Department"}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: getPerformanceColor(overview.score) + '20' }}
            >
              <div style={{ color: getPerformanceColor(overview.score) }}>
                {getPerformanceIcon(overview.score)}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Performance Score</p>
              <p className="text-[10px] text-gray-500">Current rating</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold" style={{ color: getPerformanceColor(overview.score) }}>
              {overview.score ?? "..."}
            </p>
            <p className="text-[10px] text-gray-500">/100</p>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-[#3B1E54]/5 to-[#9B7EBD]/5 rounded-lg border border-[#9B7EBD]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#3B1E54]">Performance Level</p>
              <p className="text-sm font-bold text-[#3B1E54]">
                {overview.performanceLabel || "Loading..."}
              </p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-1.5 mt-2 p-3 bg-gradient-to-r from-[#3B1E54]/5 to-[#9B7EBD]/5 rounded-lg border border-[#9B7EBD]/10">
          <p className="text-[#3B1E54] text-xs font-medium tracking-wide flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#9B7EBD]" />
            <span>
              Evaluation Month:{" "}
              {overview.evaluationMonth
                ? new Date(overview.evaluationMonth + '-01').toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })
                : 'No evaluation period set'}
            </span>
          </p>
          {overview.evaluationDate && (
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3B1E54]"></div>
              <p className="text-xs font-medium" style={{ color: '#9B7EBD' }}>
                Evaluated on: {new Date(overview.evaluationDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewDetails}
        className="w-full bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white py-2.5 px-3 rounded-lg font-semibold 
                   hover:from-[#9B7EBD] hover:to-[#3B1E54] transition-all duration-300 
                   flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-lg text-sm"
      >
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
