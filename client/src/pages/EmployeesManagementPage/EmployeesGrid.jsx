import EmployeeCard from "./EmployeeCard";

export default function EmployeesGrid({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return <p className="text-gray-600">No employees found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp._id}
          emp={emp}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
