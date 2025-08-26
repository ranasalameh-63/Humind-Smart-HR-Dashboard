// PayrollPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PayrollForm from "./PayrollForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9000/api/payroll/get");
      setPayrolls(res.data.data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
      toast.error("Failed to load payrolls", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleDelete = async (id) => {
    toast.info(
      <div className="flex flex-col">
        <p className="mb-3">Are you sure you want to delete this payroll?</p>
        <div className="flex space-x-2">
          <button
            onClick={() => confirmDelete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    toast.dismiss();
    try {
      await axios.delete(`http://localhost:9000/api/payroll/softDel/${id}`);
      fetchPayrolls();
      toast.success("Payroll deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting payroll:", error);
      toast.error("Failed to delete payroll", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchPayrolls();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'unpaid':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-white">Payroll Management</h1>
                <p className="text-purple-100 mt-2">Manage employee payrolls and compensation</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPayroll({});
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-white text-[#3B1E54] rounded-xl 
                          text-sm font-semibold hover:bg-gray-50 transform hover:scale-105 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-3 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Payroll
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-purple-100 text-sm font-medium">Total Payrolls</p>
                <p className="text-2xl font-bold">{payrolls.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-purple-100 text-sm font-medium">Paid</p>
                <p className="text-2xl font-bold">
                  {payrolls.filter(p => p.status === 'paid').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-purple-100 text-sm font-medium">Unpaid</p>
                <p className="text-2xl font-bold">
                  {payrolls.filter(p => p.status === 'unpaid').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/50">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9B7EBD] border-t-transparent"></div>
            </div>
          ) : payrolls.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No payrolls found</h3>
              <p className="text-gray-600">Start by adding your first payroll record</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#3B1E54]/10 to-[#9B7EBD]/10 border-b border-purple-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#3B1E54] uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#3B1E54] uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#3B1E54] uppercase tracking-wider">
                        Total Pay
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#3B1E54] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-[#3B1E54] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-purple-100">
                    {payrolls.map((payroll, index) => (
                      <tr 
                        key={payroll._id} 
                        className="hover:bg-gradient-to-r hover:from-[#3B1E54]/5 hover:to-[#9B7EBD]/5 transition-all duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {payroll.employee?.name?.charAt(0)?.toUpperCase() || 'N'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {payroll.employee?.name || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payroll.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {formatCurrency(payroll.totalPay)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(payroll.status)}`}>
                            {payroll.status?.charAt(0).toUpperCase() + payroll.status?.slice(1) || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(payroll)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] 
                                       text-white rounded-lg font-medium transform hover:scale-105 
                                       transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(payroll._id)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 
                                       text-white rounded-lg font-medium transform hover:scale-105 
                                       transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-purple-100">
                {payrolls.map((payroll, index) => (
                  <div 
                    key={payroll._id} 
                    className="p-6 hover:bg-gradient-to-r hover:from-[#3B1E54]/5 hover:to-[#9B7EBD]/5 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {payroll.employee?.name?.charAt(0)?.toUpperCase() || 'N'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {payroll.employee?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-600">{payroll.month}</div>
                        </div>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(payroll.status)}`}>
                        {payroll.status?.charAt(0).toUpperCase() + payroll.status?.slice(1) || 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(payroll.totalPay)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(payroll)}
                          className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] 
                                   text-white rounded-lg text-xs font-medium transform hover:scale-105 
                                   transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(payroll._id)}
                          className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 
                                   text-white rounded-lg text-xs font-medium transform hover:scale-105 
                                   transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-purple-900/20 to-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-scroll border border-white/30">
            <PayrollForm
              initialData={selectedPayroll || {}}
              onClose={() => setShowForm(false)}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #3B1E54',
          color: '#ffffff'
        }}
      />
    </div>
  );
};

export default PayrollPage;