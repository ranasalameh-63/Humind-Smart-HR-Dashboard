import { User, Mail, Phone, Building, MoreVertical } from "lucide-react";

export default function EmployeeCard({ emp = {}, onEdit = () => { }, onDelete = () => { } }) {
  const statusConfig = {
    active: {
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      dot: "bg-green-500"
    },
    on_leave: {
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      dot: "bg-yellow-500"
    },
    terminated: {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500"
    }
  };

  const currentStatus = statusConfig[emp?.status] || {
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    dot: "bg-gray-500"
  };

  const formatStatus = (status) => {
    return status?.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()) || "Unknown";
  };

  

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              {emp.profileImage ? (
                <img
                  src={emp.profileImage}
                  alt={`${emp.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white bg-opacity-20 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{emp?.name || "Name Not Available"}</h2>
              <p className="text-white text-opacity-90 text-lg">
                {emp?.position || "Position Not Assigned"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStatus.dot}`}></div>
            <span className="text-white text-sm font-medium">
              {formatStatus(emp?.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="px-6 -mt-3 relative z-10">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${currentStatus.color} ${currentStatus.bg} ${currentStatus.border} border`}>
          <div className={`w-2 h-2 rounded-full ${currentStatus.dot} mr-2`}></div>
          {formatStatus(emp?.status)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#3B1E54] uppercase tracking-wide border-b border-gray-200 pb-1">
              Contact Information
            </h3>
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-4 h-4 text-[#9B7EBD]" />
              <span className="text-sm">{emp?.email || "No email provided"}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="w-4 h-4 text-[#9B7EBD]" />
              <span className="text-sm">{emp?.phone || "No phone number"}</span>
            </div>
          </div>

          {/* Department Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#3B1E54] uppercase tracking-wide border-b border-gray-200 pb-1">
              Department Details
            </h3>
            <div className="flex items-center space-x-3 text-gray-700">
              <Building className="w-4 h-4 text-[#9B7EBD]" />
              <span className="text-sm">{emp?.department || "No department assigned"}</span>
            </div>
          </div>
        </div>      

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit(emp)}
              className="bg-[#9B7EBD] text-white px-4 py-2 rounded-lg hover:bg-[#3B1E54] transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
            >
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => onDelete(emp)}
              className="bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <button className="text-gray-400 hover:text-[#3B1E54] p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}