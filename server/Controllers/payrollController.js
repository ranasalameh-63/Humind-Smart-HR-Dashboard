const Payroll = require("../Models/payrollModel");
const Employee = require("../Models/employeeModel");

const createPayroll = async (req, res) => {
  try {
    const { employee, baseSalary, bonuses = 0, deductions = 0, month, status = "unpaid" } = req.body;

    const empExists = await Employee.findById(employee);
    if (!empExists) return res.status(404).json({ message: "Employee not found" });

const totalPay = Number(baseSalary) + Number(bonuses) - Number(deductions);

    const payroll = new Payroll({
      employee,
      baseSalary,
      bonuses,
      deductions,
      totalPay,
      month,
      status,
    });

    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPayrolls = async (req, res) => {
  try {
    const { month, status, page = 1, limit = 10 } = req.query;

   const filters = { isDeleted: false };
    if (month) filters.month = month;
    if (status) filters.status = status;


    const skip = (page - 1) * limit;

    const [payrolls, total] = await Promise.all([
      Payroll.find(filters)
        .populate("employee", "name email department")
        .skip(skip)
        .limit(Number(limit)),
      Payroll.countDocuments(filters),
    ]);

    res.json({
      data: payrolls,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const id = req.params.id;
    const { baseSalary, bonuses = 0, deductions = 0, month, status } = req.body;

const totalPay = Number(baseSalary) + Number(bonuses) - Number(deductions);

    const updated = await Payroll.findByIdAndUpdate(
      id,
      { baseSalary, bonuses, deductions, totalPay, month, status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Payroll not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePayroll = async (req, res) => {
  try {
    const updated = await Payroll.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Payroll not found" });

    res.json({ message: "Payroll soft-deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createPayroll,
  getAllPayrolls,
  updatePayroll,
  deletePayroll,
};
