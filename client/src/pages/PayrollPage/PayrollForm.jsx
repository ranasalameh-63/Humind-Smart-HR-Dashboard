// PayrollForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PayrollForm = ({ initialData = {}, onClose, onSuccess }) => {
  const isEdit = !!initialData._id;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(true);

  const ymToDate = (ym) => {
  if (!ym) return null;
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1);
};

const dateToYM = (date) => {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};


  const [form, setForm] = useState({
    employee: initialData.employee?._id || "",
    baseSalary: initialData.baseSalary || "",
    bonuses: initialData.bonuses || 0,
    deductions: initialData.deductions || 0,
    month: initialData.month || "",
    status: initialData.status || "unpaid",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setEmployeesLoading(true);
        const res = await axios.get("http://localhost:9000/api/employee/active");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        toast.error("Failed to load employees", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setEmployeesLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalPay = () => {
    const base = parseFloat(form.baseSalary) || 0;
    const bonuses = parseFloat(form.bonuses) || 0;
    const deductions = parseFloat(form.deductions) || 0;
    return base + bonuses - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axios.put(`http://localhost:9000/api/payroll/edit/${initialData._id}`, form);
        toast.success("Payroll updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await axios.post("http://localhost:9000/api/payroll/add", form);
        toast.success("Payroll added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error submitting payroll:", err);
      toast.error("Failed to save payroll. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] px-8 py-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isEdit ? "Edit Payroll" : "Add New Payroll"}
            </h2>
            <p className="text-purple-100">
              {isEdit ? "Update employee payroll information" : "Create a new payroll record"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 
                     hover:scale-110 transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-3">
            <label className="flex items-center text-gray-700 font-semibold text-sm">
              <svg className="w-4 h-4 mr-2 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Employee *
            </label>
            <div className="relative">
              <select
                name="employee"
                value={form.employee}
                onChange={handleChange}
                required
                disabled={employeesLoading}
                className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                           px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                           focus:border-[#9B7EBD] transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           appearance-none shadow-sm hover:border-[#9B7EBD]"
              >
                <option value="">
                  {employeesLoading ? "Loading employees..." : "Select Employee"}
                </option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Salary Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Salary */}
            <div className="space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm">
                <svg className="w-4 h-4 mr-2 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Base Salary *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-[#9B7EBD] font-semibold text-lg">$</span>
                </div>
                <input
                  type="number"
                  name="baseSalary"
                  placeholder="0.00"
                  value={form.baseSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                             pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                             focus:border-[#9B7EBD] transition-all duration-200
                             placeholder-gray-400 shadow-sm hover:border-[#9B7EBD]"
                />
              </div>
            </div>

            {/* Month */}
            <div className="space-y-3">
            <label className="flex items-center text-gray-700 font-semibold text-sm">
              <svg className="w-4 h-4 mr-2 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Month/Period *
            </label>

            <DatePicker
              selected={ymToDate(form.month)}
              onChange={(date) => setForm(f => ({ ...f, month: dateToYM(date) }))}
              showMonthYearPicker
              dateFormat="yyyy-MM"            
              placeholderText="Select month"
              required
              className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                        px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                        focus:border-[#9B7EBD] transition-all duration-200
                        shadow-sm hover:border-[#9B7EBD]"
            />
          </div>
          </div>

          {/* Bonuses and Deductions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bonuses */}
            <div className="space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Bonuses
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-green-500 font-semibold text-lg">$</span>
                </div>
                <input
                  type="number"
                  name="bonuses"
                  placeholder="0.00"
                  value={form.bonuses}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                             pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 
                             focus:border-green-500 transition-all duration-200
                             placeholder-gray-400 shadow-sm hover:border-green-500"
                />
              </div>
            </div>

            {/* Deductions */}
            <div className="space-y-3">
              <label className="flex items-center text-gray-700 font-semibold text-sm">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Deductions
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-red-500 font-semibold text-lg">$</span>
                </div>
                <input
                  type="number"
                  name="deductions"
                  placeholder="0.00"
                  value={form.deductions}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                             pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 
                             focus:border-red-500 transition-all duration-200
                             placeholder-gray-400 shadow-sm hover:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="flex items-center text-gray-700 font-semibold text-sm">
              <svg className="w-4 h-4 mr-2 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payment Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl 
                           px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                           focus:border-[#9B7EBD] transition-all duration-200
                           appearance-none shadow-sm hover:border-[#9B7EBD]"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-5 h-5 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Pay Preview */}
          {(form.baseSalary || form.bonuses || form.deductions) && (
            <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Payment Summary
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-purple-100 text-xs font-medium mb-1">Base Salary</p>
                  <p className="text-white font-bold text-lg">${parseFloat(form.baseSalary || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-purple-100 text-xs font-medium mb-1">Bonuses</p>
                  <p className="text-green-300 font-bold text-lg">+${parseFloat(form.bonuses || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-purple-100 text-xs font-medium mb-1">Deductions</p>
                  <p className="text-red-300 font-bold text-lg">-${parseFloat(form.deductions || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 border-2 border-white/30">
                  <p className="text-purple-100 text-xs font-medium mb-1">Total Pay</p>
                  <p className="text-white font-bold text-xl">${calculateTotalPay().toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 
                         rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </button>
            
            <button
              type="submit"
              disabled={loading || employeesLoading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] 
                         text-white rounded-xl font-semibold hover:from-[#9B7EBD] hover:to-[#3B1E54] 
                         transform hover:scale-105 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d={isEdit ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                                   : "M12 4v16m8-8H4"} />
                  </svg>
                  <span>{isEdit ? "Update Payroll" : "Add Payroll"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollForm;