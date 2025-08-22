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
    toast.success("Payroll updated successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Payroll Management</h1>
            <p className="text-[#E8E8E8] text-lg">Manage employee payrolls and compensation</p>
          </div>
          <button
            onClick={() => {
              setSelectedPayroll(null);
              setShowForm(true);
            }}
            className="group relative px-8 py-4 bg-white text-[#3B1E54] rounded-xl font-semibold text-lg 
                       hover:bg-[#f0f0f0] transform hover:scale-105 transition-all duration-300 
                       shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Payroll</span>
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Payrolls</h3>
          <p className="text-3xl font-bold">{payrolls.length}</p>
        </div>
        <div className="bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Paid</h3>
          <p className="text-3xl font-bold">
            {payrolls.filter(p => p.status === 'paid').length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">unpaid</h3>
          <p className="text-3xl font-bold">
            {payrolls.filter(p => p.status === 'unpaid').length}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#3B1E54]/30">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#9B7EBD] border-t-transparent"></div>
          </div>
        ) : payrolls.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#3B1E54] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[#9B7EBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No Payrolls Found</h3>
            <p className="text-[#9B7EBD] text-lg">Start by adding your first payroll record</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {payrolls.map((payroll, index) => (
              <div
                key={payroll._id}
                className="group bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 
                           border border-[#3B1E54]/30 shadow-lg hover:shadow-2xl 
                           transform hover:scale-[1.02] transition-all duration-300
                           hover:border-[#9B7EBD]/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-[#9B7EBD] text-sm font-medium">Employee</p>
                        <p className="text-white text-lg font-semibold">{payroll.employee.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#9B7EBD] text-sm font-medium">Month</p>
                        <p className="text-white text-lg font-semibold">{payroll.month}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#9B7EBD] text-sm font-medium">Total Pay</p>
                        <p className="text-white text-lg font-semibold">${payroll.totalPay}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#9B7EBD] text-sm font-medium">Status</p>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                          ${payroll.status === 'processed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : payroll.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                          {payroll.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 ml-6">
                    <button
                      onClick={() => handleEdit(payroll)}
                      className="group/btn px-4 py-2 bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] 
                                 text-white rounded-lg font-medium transform hover:scale-105 
                                 transition-all duration-200 shadow-lg hover:shadow-xl
                                 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(payroll._id)}
                      className="group/btn px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 
                                 text-white rounded-lg font-medium transform hover:scale-105 
                                 transition-all duration-200 shadow-lg hover:shadow-xl
                                 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl shadow-2xl 
                          border border-[#3B1E54]/30 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <PayrollForm
              initialData={selectedPayroll}
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