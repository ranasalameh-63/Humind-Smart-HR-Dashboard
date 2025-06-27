import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Users, Search, Filter, X  } from 'lucide-react';
import { toast } from "react-toastify";

import EmployeeModal from "../../pages/EmployeesManagementPage/EmployeeModal";
import EmployeeForm from "../../pages/EmployeesManagementPage/EmployeeForm";
import EmployeesGrid from "../../pages/EmployeesManagementPage/EmployeesGrid";

export default function EmployeesManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    profileImage: null,
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/api/employee/all", {
        withCredentials: true,
        params: {
          page,
          limit,
          search: searchTerm,
        },
      });
      setEmployees(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
  fetchEmployees();
}, [page, searchTerm]);


  


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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


    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:9000/api/employee/add", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEmployees();
      closeModals();
      toast.success("Employee added successfully!");
    } catch (err) {
      toast.error("Failed to add employee");
    }

  };


  const handleEdit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });

    try {
      await axios.patch(
        `http://localhost:9000/api/employee/update/${selectedEmployee._id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      fetchEmployees();
      closeModals();
      toast.success("Employee updated successfully!");
    } catch (err) {
      toast.error("Failed to update employee");
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
      toast.success("Employee deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete employee");
    }

  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-via-purple-100 via-purple-100 to-white rounded-xl border border-gray-100 shadow-sm">
        {/* Left Side - Title with Icon */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#3B1E54] rounded-lg shadow-md">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-[#3B1E54] bg-clip-text text-transparent">
              Employee Management
            </h1>
          </div>
        </div>
         <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        {/* Enhanced Search Container */}
        <div className={`
          flex items-center gap-3 p-1 
          bg-white rounded-xl shadow-lg border-2 transition-all duration-300
          ${isSearchFocused 
            ? 'border-purple-400 shadow-purple-100 shadow-2xl scale-[1.02]' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
          }
        `}>
          
          {/* Search Input Container */}
          <div className="flex-1 relative">
            <div className="flex items-center">
              <Search 
                className={`
                  absolute left-4 transition-colors duration-200
                  ${isSearchFocused ? 'text-purple-500' : 'text-gray-400'}
                `} 
                size={20} 
              />
              
              <input
                type="text"
                placeholder="Search by name, email, department, or role..."
                className="
                  w-full pl-12 pr-10 py-4 
                  text-gray-700 placeholder-gray-400
                  bg-transparent border-none outline-none
                  text-lg font-medium
                "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              
            </div>
          </div>

          {/* Enhanced Apply Button */}
          <button
            onClick={fetchEmployees}
            className="
              group relative px-8 py-4 
              bg-[#3B1E54]
              hover:from-purple-700 hover:to-purple-800
              text-white font-semibold rounded-lg
              shadow-lg hover:shadow-xl
              transform hover:scale-105 active:scale-95
              transition-all duration-200
              border-2 border-transparent hover:border-purple-300
            "
          >
            <span className="flex items-center gap-2">
              <Search size={18} className="group-hover:rotate-12 transition-transform duration-200" />
              Search
            </span>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200 -z-10 blur-sm"></div>
          </button>
        
        </div>

      </div>
    </div>
        {/* Right Side - Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openAddModal}
            className="group relative bg-[#3B1E54] text-white px-6 py-3 rounded-xl font-semibold 
                     hover:bg-[#9B7EBD] transition-all duration-300 ease-in-out
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                     border-2 border-transparent hover:border-[#3B1E54]/20
                     flex items-center space-x-2"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span> Employee</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#9B7EBD]/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>
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
      <div className="flex justify-center items-center gap-3 mt-6">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-6 py-3 bg-white border-2 border-[#3B1E54] text-[#3B1E54] rounded-lg font-semibold 
               hover:bg-[#3B1E54] hover:text-white transition-all duration-300 ease-in-out
               disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 
               disabled:hover:bg-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed
               shadow-md hover:shadow-lg transform hover:scale-105"
  >
    ← Previous
  </button>
  
  <div className="px-6 py-3 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white 
                  rounded-lg font-bold text-lg shadow-lg border-2 border-[#3B1E54]
                  min-w-[60px] text-center">
    {page}
  </div>
  
  <button
    onClick={() => setPage((prev) => prev + 1)}
    className="px-6 py-3 bg-white border-2 border-[#3B1E54] text-[#3B1E54] rounded-lg font-semibold
               hover:bg-[#3B1E54] hover:text-white transition-all duration-300 ease-in-out
               shadow-md hover:shadow-lg transform hover:scale-105"
  >
    Next →
  </button>
</div>

    </div>
  );
}
