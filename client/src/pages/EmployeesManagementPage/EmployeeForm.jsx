export default function EmployeeForm({ formData = {}, handleChange }) {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border border-purple-100">
      {/* Profile Image Section */}
      <div className="group">
        <label className="flex items-center gap-2 text-[#3B1E54] font-semibold mb-3 text-sm uppercase tracking-wide">
          <div className="w-2 h-2 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          Profile Image
        </label>
        <div className="relative">
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-4 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/50 hover:border-[#9B7EBD] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-[#9B7EBD] file:to-[#3B1E54] file:text-white file:cursor-pointer file:hover:shadow-lg file:transition-all file:duration-300"
          />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-[#3B1E54] font-medium shadow-lg">
              Click to upload
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <div className="relative group">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 peer placeholder-transparent"
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-[#3B1E54] transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#9B7EBD]">
              Full Name *
            </label>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1 h-8 bg-gradient-to-b from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="relative group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 peer placeholder-transparent"
          />
          <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-[#3B1E54] transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#9B7EBD]">
            Email Address *
          </label>
          <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-8 bg-gradient-to-b from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          </div>
        </div>

        {/* Phone */}
        <div className="relative group">
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 peer placeholder-transparent"
          />
          <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-[#3B1E54] transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#9B7EBD]">
            Phone Number
          </label>
          <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-8 bg-gradient-to-b from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          </div>
        </div>

        {/* Position */}
        <div className="relative group">
          <input
            name="position"
            placeholder="Position"
            value={formData.position || ''}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 peer placeholder-transparent"
          />
          <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-[#3B1E54] transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#9B7EBD]">
            Position
          </label>
          <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-8 bg-gradient-to-b from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          </div>
        </div>

        {/* Department */}
        <div className="relative group">
          <input
            name="department"
            placeholder="Department"
            value={formData.department || ''}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 peer placeholder-transparent"
          />
          <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-[#3B1E54] transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#9B7EBD]">
            Department
          </label>
          <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-8 bg-gradient-to-b from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="group">
        <label className="flex items-center gap-2 text-[#3B1E54] font-semibold mb-3 text-sm uppercase tracking-wide">
          <div className="w-2 h-2 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] rounded-full"></div>
          Employment Status
        </label>
        <div className="relative">
          <select
            name="status"
            value={formData.status || 'active'}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#9B7EBD]/20 focus:border-[#9B7EBD] focus:bg-white hover:border-purple-300 appearance-none cursor-pointer"
          >
            <option value="active">✅ Active</option>
            <option value="on_leave">🏖️ On Leave</option>
            <option value="terminated">❌ Terminated</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-[#9B7EBD] transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#9B7EBD]/10 to-[#3B1E54]/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-lg"></div>
    </div>
  );
}