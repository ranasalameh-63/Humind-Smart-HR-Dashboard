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
  const [sortBy, setSortBy] = useState("latestScore");
  const [totalPages, setTotalPages] = useState(1);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/performance/with-evaluation", {
          params: { page, limit, search, department, sortBy },
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
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      <div className="relative overflow-hidden">
        {/* Background gradient with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#9B7EBD]/5 to-[#3B1E54]/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,126,189,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mb-4 p-3 md:p-4 bg-white border border-[#9B7EBD]/20 shadow-lg shadow-[#000000]/10 rounded-xl backdrop-blur-sm overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B7EBD]/5 via-transparent to-[#3B1E54]/5 pointer-events-none"></div>

          {/* Main Header Section */}
          <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-gradient-to-br from-[#000000] via-[#3B1E54] to-[#9B7EBD] rounded-lg shadow-lg shadow-[#000000]/30 group">
                <TrendingUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#9B7EBD]/30 to-[#3B1E54]/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] bg-clip-text text-transparent">
                  Performance Overview
                </h1>
                <p className="text-[#3B1E54]/80 text-xs md:text-sm font-medium">
                  Track and manage employee evaluations
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {/* Search Bar - Compact */}
                <div className="relative flex-1 min-w-[220px] md:min-w-[200px] md:max-w-xs">
                  <div
                    className={`
                flex items-center px-3 py-2
                bg-white/90 rounded-lg shadow-md border-2 transition-all duration-300 backdrop-blur-sm
                ${isSearchFocused
                        ? 'border-[#9B7EBD] shadow-[#9B7EBD]/30 ring-1 ring-[#9B7EBD]/20'
                        : 'border-[#3B1E54]/20 hover:border-[#3B1E54]/40'}
              `}
                  >
                    <Search
                      className={`mr-2 transition-colors duration-200
                  ${isSearchFocused ? 'text-[#9B7EBD]' : 'text-[#3B1E54]/60'}`}
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-1 py-0 text-sm text-[#000000] placeholder-[#3B1E54]/50 bg-transparent border-none outline-none font-medium"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </div>
                </div>


                {/* Department Filter - Compact */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 text-sm border-2 border-[#3B1E54]/20 rounded-lg bg-white/90 text-[#000000] font-medium hover:border-[#9B7EBD]/60 focus:border-[#9B7EBD] focus:ring-1 focus:ring-[#9B7EBD]/20 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <option value="">All Departments</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>

                {/* Sort Filter - Compact */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 text-sm border-2 border-[#3B1E54]/20 rounded-lg bg-white/90 text-[#000000] font-medium hover:border-[#9B7EBD]/60 focus:border-[#9B7EBD] focus:ring-1 focus:ring-[#9B7EBD]/20 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <option value="latestScore">Sort by Score</option>
                    <option value="latestEvaluationDate">Sort by Date</option>
                  </select>
                </div>
              </div>
            </div>

           <button
              className="group relative w-full md:w-auto bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] 
                        text-white px-4 py-2 rounded-md font-medium shadow-md shadow-[#000000]/30 
                         duration-300 border border-white/10 hover:border-white/20 text-sm"
              onClick={() => {
                const firstEmployee = employees[0];
                if (firstEmployee) {
                  setSelectedForAdd(firstEmployee);
                  setIsModalOpen(true);
                }
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Add Evaluation</span>
              </div>

              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#000000] via-[#3B1E54] to-[#9B7EBD] opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#9B7EBD]/30 to-[#3B1E54]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9B7EBD]/30 to-transparent"></div>
        </div>
      </div>

      {/* Cards grid (responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-lg w-full">
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

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 md:px-6 py-2.5 md:py-3 bg-white border-2 border-[#3B1E54] text-[#3B1E54] rounded-lg font-semibold hover:bg-[#3B1E54] hover:text-white transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
        >
          ← Previous
        </button>

        <div className="px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white rounded-lg font-bold text-base md:text-lg shadow-lg border-2 border-[#3B1E54] min-w-[56px] md:min-w-[60px] text-center">
          {page}
        </div>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 md:px-6 py-2.5 md:py-3 bg-white border-2 border-[#3B1E54] text-[#3B1E54] rounded-lg font-semibold hover:bg-[#3B1E54] hover:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
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
