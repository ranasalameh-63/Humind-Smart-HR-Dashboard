import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, TrendingUp, Search } from 'lucide-react';

import OverviewCard from "./OverviewCard";
import PerformanceDetailsModal from "./PerformanceDetailsModal";
import AddPerformanceForm from "./PerformanceForm";

export default function PerformanceAnalyticsPage() {
  const [employees, setEmployees] = useState([]);
  const [evaluatedEmployees, setevaluatedEmployees] = useState([]);
  const [overviewData, setOverviewData] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForAdd, setSelectedForAdd] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("latestScore"); // أو "latestEvaluationDate"
  const [totalPages, setTotalPages] = useState(1);

    const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/performance/with-evaluation", {
          params: {
            page,
            limit,
            search,
            department,
            sortBy,
          },
        });
        setEmployees(res.data.data);
        setTotalPages(res.data.pages);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };
    fetchEmployees();
  }, [page, limit, search, department, sortBy]);

  

  useEffect(() => {
    const fetchevaluatedEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/employee/all");
        setevaluatedEmployees(res.data.data);
      } catch (err) {
        console.error("Failed to fetch employees");
      }
    };
    fetchevaluatedEmployees();
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

        <div className="relative mb-4 p-4 bg-white border border-[#9B7EBD]/20 shadow-lg shadow-[#000000]/10 rounded-xl backdrop-blur-sm overflow-hidden">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#9B7EBD]/5 via-transparent to-[#3B1E54]/5 pointer-events-none"></div>
  
  {/* Main Header Section */}
  <div className="relative flex justify-between items-center mb-4">
    <div className="flex items-center space-x-4">
      <div className="relative p-2 bg-gradient-to-br from-[#000000] via-[#3B1E54] to-[#9B7EBD] rounded-lg shadow-lg shadow-[#000000]/30 group">
        <TrendingUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#9B7EBD]/30 to-[#3B1E54]/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] bg-clip-text text-transparent">
          Performance Overview
        </h1>
        <p className="text-[#3B1E54]/80 text-sm font-medium">
          Track and manage employee evaluations
        </p>
      </div>
    </div>

    <button
      className="group relative bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-[#000000]/30 hover:shadow-xl hover:shadow-[#3B1E54]/40 transform hover:-translate-y-0.5 transition-all duration-300 border border-white/10 hover:border-white/20"
      onClick={() => {
        const firstEmployee = employees[0];
        if (firstEmployee) {
          setSelectedForAdd(firstEmployee);
          setIsModalOpen(true);
        }
      }}
    >
      <div className="flex items-center space-x-2">
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        <span>Add Evaluation</span>
      </div>

      {/* Multi-layer hover effects */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#9B7EBD]/30 to-[#3B1E54]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  </div>

  {/* Compact Search and Filters Section */}
  <div className="flex items-center gap-3">
    {/* Search Bar - Compact */}
    <div className="relative flex-1 max-w-xs">
      <div className={`
        flex items-center p-1
        bg-white/90 rounded-lg shadow-md border-2 transition-all duration-300 backdrop-blur-sm
        ${isSearchFocused
          ? 'border-[#9B7EBD] shadow-[#9B7EBD]/30 ring-1 ring-[#9B7EBD]/20'
          : 'border-[#3B1E54]/20 hover:border-[#3B1E54]/40'
        }
      `}>
        <div className={`
          p-1 rounded transition-all duration-200
          ${isSearchFocused 
            ? 'text-[#9B7EBD]' 
            : 'text-[#3B1E54]/60'
          }
        `}>
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="
            flex-1 pr-2 py-2 text-sm
            text-[#000000] placeholder-[#3B1E54]/50
            bg-transparent border-none outline-none
            font-medium
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
    </div>

    {/* Department Filter - Compact */}
    <div className="relative">
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="px-3 py-2 text-sm border-2 border-[#3B1E54]/20 rounded-lg bg-white/90 text-[#000000] font-medium hover:border-[#9B7EBD]/60 focus:border-[#9B7EBD] focus:ring-1 focus:ring-[#9B7EBD]/20 transition-all duration-300 shadow-md cursor-pointer"
      >
        <option value="">All Departments</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Customer Service">Customer Service</option>
      </select>
    </div>

    {/* Sort Filter - Compact */}
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 text-sm border-2 border-[#3B1E54]/20 rounded-lg bg-white/90 text-[#000000] font-medium hover:border-[#9B7EBD]/60 focus:border-[#9B7EBD] focus:ring-1 focus:ring-[#9B7EBD]/20 transition-all duration-300 shadow-md cursor-pointer"
      >
        <option value="latestScore">Sort by Score</option>
        <option value="latestEvaluationDate">Sort by Date</option>
      </select>
    </div>
  </div>

  {/* Decorative bottom border */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9B7EBD]/30 to-transparent"></div>
</div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <OverviewCard
            key={emp._id}
            employee={emp}
            overview={overviewData[emp._id] || {
              score: emp.latestScore,
              performanceLabel: "Loading...",
              evaluationDate: emp.latestEvaluationDate,
              evaluationMonth: emp.evaluationMonth,
            }}
            onViewDetails={() => handleOpenModal(emp)}
          />

        ))}
      </div>
      {isModalOpen && evaluatedEmployees.length > 0 && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <AddPerformanceForm
              evaluatedEmployees={evaluatedEmployees}
              onClose={() => setIsModalOpen(false)}
              onAdded={() => {
                const fetchOverviews = async () => {
                  const data = {};
                  await Promise.all(
                    evaluatedEmployees.map(async (emp) => {
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




      {isModalOpen && selectedEmployee && (
        <PerformanceDetailsModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>

  );
}
