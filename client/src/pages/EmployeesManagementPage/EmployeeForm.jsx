export default function EmployeeForm({ formData, handleChange }) {
  return (
    <>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      />
      <input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      />
      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      />

      <label className="block text-[#3B1E54] font-medium mt-4">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
      >
        <option value="active">Active</option>
        <option value="on_leave">On Leave</option>
        <option value="terminated">Terminated</option>
      </select>
    </>
  );
}
