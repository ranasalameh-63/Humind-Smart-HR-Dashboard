import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, TrendingUp } from 'lucide-react';

import OverviewCard from "./OverviewCard";
import PerformanceDetailsModal from "./PerformanceDetailsModal";
import AddPerformanceForm from "./PerformanceForm";

export default function PerformanceAnalyticsPage() {
  const [employees, setEmployees] = useState([]);
  const [overviewData, setOverviewData] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForAdd, setSelectedForAdd] = useState(null);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/employee/all");
        setEmployees(res.data.data);
      } catch (err) {
        console.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, []);

  // Fetch overview score for each employee
  useEffect(() => {
    const fetchOverviews = async () => {
      const data = {};
      await Promise.all(
        employees.map(async (emp) => {
          try {
            const res = await axios.get(
              `http://localhost:9000/api/performance/overview/${emp._id}`
            );
            data[emp._id] = res.data;
          } catch {
            data[emp._id] = { score: 0, status: "No Data" };
          }
        })
      );
      setOverviewData(data);
    };

    if (employees.length) {
      fetchOverviews();
    }
  }, [employees]);

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
        <div className="relative overflow-hidden">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#9B7EBD]/5 to-[#3B1E54]/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,126,189,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative flex justify-between items-center mb-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#9B7EBD]/10 shadow-lg shadow-[#3B1E54]/5">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-[#3B1E54] to-[#9B7EBD] rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-[#3B1E54] bg-clip-text text-transparent">
              Performance Overview
            </h1>
            <p className="text-[#9B7EBD]/70 text-sm font-medium mt-1">
              Track and manage employee evaluations
            </p>
          </div>
        </div>

        <button
          className="group relative bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#3B1E54]/25 hover:shadow-xl hover:shadow-[#3B1E54]/30 transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20"
          onClick={() => {
            const firstEmployee = employees[0];
            if (firstEmployee) {
              setSelectedForAdd(firstEmployee);
              setIsModalOpen(true);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add Evaluation</span>
          </div>
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </button>
      </div>
      
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <OverviewCard
            key={emp._id}
            employee={emp}
            overview={overviewData[emp._id]}
            onViewDetails={() => handleOpenModal(emp)}
          />
        ))}
      </div>
   {isModalOpen && employees.length > 0 && (
  <div className="fixed inset-0  flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      <AddPerformanceForm
        employees={employees}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          const fetchOverviews = async () => {
            const data = {};
            await Promise.all(
              employees.map(async (emp) => {
                try {
                  const res = await axios.get(
                    `http://localhost:9000/api/performance/overview/${emp._id}`
                  );
                  data[emp._id] = res.data;
                } catch {
                  data[emp._id] = { score: 0, status: "No Data" };
                }
              })
            );
            setOverviewData(data);
          };
          fetchOverviews();
        }}
      />
    </div>
  </div>
)}



      {isModalOpen && selectedEmployee && (
        <PerformanceDetailsModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
    
  );
}
