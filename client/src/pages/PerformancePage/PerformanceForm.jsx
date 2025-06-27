
import { useState } from "react";
import axios from "axios";
import { X, User, FileText, BarChart3, MessageSquare, Users, Zap, Shield } from "lucide-react";
import { toast } from "react-toastify";


export default function AddPerformanceForm({ employees = [], onAdded, onClose }) {
  const [employeeId, setEmployeeId] = useState("");
  const [notes, setNotes] = useState("");
  const [criteria, setCriteria] = useState({
    communication: 0,
    teamwork: 0,
    productivity: 0,
    reliability: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const criteriaIcons = {
    communication: MessageSquare,
    teamwork: Users,
    productivity: Zap,
    reliability: Shield,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const criteriaValues = Object.values(criteria || {});
    const score =
      criteriaValues.reduce((sum, val) => sum + val, 0) / (criteriaValues.length || 1);
    
    try {
      // Simulating API call - replace with your actual axios call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Your actual API call would be:
      await axios.post("http://localhost:9000/api/performance/add", {
        employeeId,
        score: Math.round(score),
        notes,
        criteria,
      });
      
      toast.success("Performance added successfully!");
      onAdded();
      onClose?.();
    } catch {
      toast.error("Failed to add performance");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const averageScore = Object.values(criteria).reduce((sum, val) => sum + val, 0) / 4;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/100 via-purple-900/20 to-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative border border-white/20 transform animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Add Performance Review</h2>
              <p className="text-white text-opacity-80">Evaluate employee performance metrics</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-[#3B1E54] font-semibold">
              <User size={18} />
              <span>Select Employee</span>
            </label>
            <select
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#9B7EBD] focus:outline-none transition-colors duration-200 bg-white"
            >
              <option value="">Choose an employee...</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Performance Criteria */}
          <div className="space-y-4">
            <h3 className="text-[#3B1E54] font-semibold text-lg flex items-center space-x-2">
              <BarChart3 size={20} />
              <span>Performance Criteria</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(criteria).map((key) => {
                const IconComponent = criteriaIcons[key];
                return (
                  <div key={key} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <label className="flex items-center space-x-2 text-[#3B1E54] font-medium mb-3 capitalize">
                      <IconComponent size={18} />
                      <span>{key}</span>
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={criteria[key]}
                        onChange={(e) =>
                          setCriteria((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #9B7EBD 0%, #9B7EBD ${criteria[key]}%, #e5e7eb ${criteria[key]}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between items-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={criteria[key]}
                          onChange={(e) =>
                            setCriteria((prev) => ({ ...prev, [key]: Number(e.target.value) }))
                          }
                          className="w-16 p-1 border border-gray-300 rounded text-center text-sm focus:border-[#9B7EBD] focus:outline-none"
                        />
                        <span className={`font-semibold ${getScoreColor(criteria[key])}`}>
                          {criteria[key]}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Score Display */}
            <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl p-4 text-white">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Overall Score:</span>
                <span className={`text-2xl font-bold`}>
                  {Math.round(averageScore)}%
                </span>
              </div>
              <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${averageScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-[#3B1E54] font-semibold">
              <FileText size={18} />
              <span>Additional Notes</span>
            </label>
            <textarea
              placeholder="Add any additional comments or observations about the employee's performance..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#9B7EBD] focus:outline-none transition-colors duration-200 resize-none bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !employeeId}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white rounded-xl hover:from-[#2d1640] hover:to-[#8a6fb0] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add Performance Review</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B1E54;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B1E54;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
