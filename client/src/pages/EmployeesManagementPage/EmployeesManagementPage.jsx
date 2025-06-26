import { useEffect, useState } from "react";
import axios from "axios";

import EmployeeModal from "../../pages/EmployeesManagementPage/EmployeeModal";
import EmployeeForm from "../../pages/EmployeesManagementPage/EmployeeForm";
import EmployeesGrid from "../../pages/EmployeesManagementPage/EmployeesGrid";

export default function EmployeesManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    phone: "",
    status: "active",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/api/employee/all", {
        withCredentials: true,
      });
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      phone: "",
      status: "active",
    });
    setIsAddOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position || "",
      department: employee.department || "",
      phone: employee.phone || "",
      status: employee.status || "active",
    });
    setIsEditOpen(true);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteOpen(true);
  };

  const closeModals = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setSelectedEmployee(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/employee/add", formData, {
        withCredentials: true,
      });
      fetchEmployees();
      closeModals();
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:9000/api/employee/update/${selectedEmployee._id}`,
        formData,
        { withCredentials: true }
      );
      fetchEmployees();
      closeModals();
    } catch (err) {
      alert("Failed to update employee");
    }
  };

  //(soft delete)
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:9000/api/employee/delete/${selectedEmployee._id}`,
        { withCredentials: true }
      );
      fetchEmployees();
      closeModals();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="p-6 bg-[#EEEEEE] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#3B1E54]">Employees Management</h1>
        <button
          onClick={openAddModal}
          className="bg-[#3B1E54] text-white px-4 py-2 rounded-lg hover:bg-[#9B7EBD] transition"
        >
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeesGrid
          employees={employees}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      <EmployeeModal isOpen={isAddOpen} onClose={closeModals}>
        <h2 className="text-2xl font-bold mb-4 text-[#3B1E54]">Add New Employee</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <EmployeeForm formData={formData} handleChange={handleChange} />
          <button
            type="submit"
            className="w-full bg-[#3B1E54] text-white py-3 rounded font-semibold hover:bg-[#9B7EBD] transition"
          >
            Add Employee
          </button>
        </form>
      </EmployeeModal>

      <EmployeeModal isOpen={isEditOpen} onClose={closeModals}>
        <h2 className="text-2xl font-bold mb-4 text-[#3B1E54]">Edit Employee</h2>
        <form onSubmit={handleEdit} className="space-y-4">
          <EmployeeForm formData={formData} handleChange={handleChange} />
          <button
            type="submit"
            className="w-full bg-[#3B1E54] text-white py-3 rounded font-semibold hover:bg-[#9B7EBD] transition"
          >
            Save Changes
          </button>
        </form>
      </EmployeeModal>

      <EmployeeModal isOpen={isDeleteOpen} onClose={closeModals}>
        <h2 className="text-2xl font-bold mb-4 text-[#3B1E54]">Confirm Delete</h2>
        <p>
          Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={closeModals}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </EmployeeModal>
    </div>
  );
}
