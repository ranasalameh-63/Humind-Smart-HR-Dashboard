// PayrollForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const PayrollForm = ({ initialData = {}, onClose, onSuccess }) => {
  const isEdit = !!initialData._id;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(true);

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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isEdit ? "Edit Payroll" : "Add New Payroll"}
          </h2>
          <p className="text-[#9B7EBD]">
            {isEdit ? "Update employee payroll information" : "Create a new payroll record"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#9B7EBD] hover:text-white hover:bg-[#3B1E54] 
                     rounded-lg transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Selection */}
        <div className="space-y-2">
          <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
            Employee *
          </label>
          <div className="relative">
            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              required
              disabled={employeesLoading}
              className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                         px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                         focus:border-transparent transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         appearance-none"
            >
              <option value="" className="bg-[#1a1a1a]">
                {employeesLoading ? "Loading employees..." : "Select Employee"}
              </option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id} className="bg-[#1a1a1a]">
                  {emp.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Salary Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Salary */}
          <div className="space-y-2">
            <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
              Base Salary *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#9B7EBD] font-semibold">$</span>
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
                className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                           pl-8 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                           focus:border-transparent transition-all duration-200
                           placeholder-[#666]"
              />
            </div>
          </div>

          {/* Month */}
          <div className="space-y-2">
            <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
              Month/Period *
            </label>
            <input
              type="text"
              name="month"
              placeholder="e.g., July 2025"
              value={form.month}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                         px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                         focus:border-transparent transition-all duration-200
                         placeholder-[#666]"
            />
          </div>
        </div>

        {/* Bonuses and Deductions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bonuses */}
          <div className="space-y-2">
            <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
              Bonuses
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#9B7EBD] font-semibold">$</span>
              </div>
              <input
                type="number"
                name="bonuses"
                placeholder="0.00"
                value={form.bonuses}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                           pl-8 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                           focus:border-transparent transition-all duration-200
                           placeholder-[#666]"
              />
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-2">
            <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
              Deductions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#9B7EBD] font-semibold">$</span>
              </div>
              <input
                type="number"
                name="deductions"
                placeholder="0.00"
                value={form.deductions}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                           pl-8 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                           focus:border-transparent transition-all duration-200
                           placeholder-[#666]"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-[#9B7EBD] font-semibold text-sm uppercase tracking-wider">
            Payment Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#3B1E54] text-white rounded-xl 
                         px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9B7EBD] 
                         focus:border-transparent transition-all duration-200
                         appearance-none"
            >
              <option value="unpaid" className="bg-[#1a1a1a]">Unpaid</option>
              <option value="paid" className="bg-[#1a1a1a]">Paid</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Pay Preview */}
        {(form.baseSalary || form.bonuses || form.deductions) && (
          <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Payment Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-white/70">Base Salary</p>
                <p className="text-white font-semibold">${parseFloat(form.baseSalary || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-white/70">Bonuses</p>
                <p className="text-green-300 font-semibold">+${parseFloat(form.bonuses || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-white/70">Deductions</p>
                <p className="text-red-300 font-semibold">-${parseFloat(form.deductions || 0).toFixed(2)}</p>
              </div>
              <div className="border-l border-white/20 pl-4">
                <p className="text-white/70">Total Pay</p>
                <p className="text-white font-bold text-lg">${calculateTotalPay().toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-4 bg-transparent border border-[#3B1E54] text-[#9B7EBD] 
                       rounded-xl font-semibold hover:bg-[#3B1E54] hover:text-white 
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancel</span>
          </button>
          
          <button
            type="submit"
            disabled={loading || employeesLoading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] 
                       text-white rounded-xl font-semibold hover:from-[#3B1E54] hover:to-[#9B7EBD] 
                       transform hover:scale-105 transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                       flex items-center justify-center space-x-2"
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
  );
};

export default PayrollForm;