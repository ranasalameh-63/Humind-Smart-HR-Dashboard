export default function EmployeeCard({ emp, onEdit, onDelete }) {
  const statusColors = {
    active: "text-green-600",
    on_leave: "text-yellow-600",
    terminated: "text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-[#3B1E54]">{emp.name}</h2>
      <p className="text-gray-700">{emp.email}</p>
      <p className="text-gray-700">{emp.position || "No position"}</p>
      <p className="text-gray-700">{emp.department || "No department"}</p>
      <p className="text-gray-700">{emp.phone || "No Phone Number"}</p>
      <p className={`mt-2 font-semibold ${statusColors[emp.status] || "text-gray-600"}`}>
        Status: {emp.status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </p>
      <div className="flex gap-3 mt-4">
        <button onClick={() => onEdit(emp)} className="bg-[#9B7EBD] text-white px-3 py-1 rounded hover:bg-[#3B1E54] transition">
          Edit
        </button>
        <button onClick={() => onDelete(emp)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">
          Delete
        </button>
      </div>
    </div>
  );
}
